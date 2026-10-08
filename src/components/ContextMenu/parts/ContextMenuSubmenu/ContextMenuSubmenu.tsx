import {
  autoUpdate,
  flip,
  FloatingList,
  FloatingNode,
  offset,
  shift,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useListNavigation
} from '@floating-ui/react';
import { clsx } from 'clsx';
import { type FocusEvent, type MouseEvent, type ReactNode, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ContextMenuLevelContext, type ContextMenuLevelInterface, useContextMenu } from '../../context';
import { COLLISION_PADDING, SUBMENU_OFFSET } from '../../helpers';
import { type ContextMenuItemNested } from '../../types';
import { ContextMenuContent } from '../ContextMenuContent';
import { ContextMenuRow, type ContextMenuRowProps } from '../ContextMenuRow';

export interface ContextMenuSubmenuProps {
  item: ContextMenuItemNested
  open: boolean
  /** Клавиатура просит изменить открытость подменю (ArrowRight/ArrowLeft из useListNavigation) */
  onOpenChange: (open: boolean) => void
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onRowMouseEnter: (id: string) => void
  onRowMouseLeave: () => void
  onPanelMouseEnter: () => void
  onPanelMouseLeave: () => void
  onRowFocus?: (event: FocusEvent<HTMLElement>) => void
  children: ReactNode
}

export const ContextMenuSubmenu = (props: ContextMenuSubmenuProps) => {
  const {
    item,
    open,
    onOpenChange,
    onClick,
    onRowMouseEnter,
    onRowMouseLeave,
    onPanelMouseEnter,
    onPanelMouseLeave,
    onRowFocus,
    children
  } = props;

  const { innerClassNames } = useContextMenu();

  // Связка с родительским узлом FloatingTree: клики по этой панели
  // не считаются «outside press» для корневого меню.
  const nodeId = useFloatingNodeId();

  // Собственная навигация уровня подменю. `nested: true` склеивает её с родительским уровнем:
  // ArrowRight на строке открывает подменю и фокусирует его первый пункт,
  // ArrowLeft внутри панели закрывает подменю и возвращает фокус на строку-родитель.
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open,
    onOpenChange,
    placement: 'right-start',
    strategy: 'fixed',
    middleware: [
      offset(SUBMENU_OFFSET),
      flip({ fallbackPlacements: ['left-start'], padding: COLLISION_PADDING }),
      shift({ padding: COLLISION_PADDING })
    ],
    whileElementsMounted: autoUpdate
  });

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    nested: true
  });

  const { getFloatingProps, getItemProps, getReferenceProps } = useInteractions([listNavigation]);

  const levelContext = useMemo<ContextMenuLevelInterface>(() => ({
    activeIndex,
    getItemProps
  }), [activeIndex, getItemProps]);

  const handleRowKeyDown = getReferenceProps().onKeyDown as ContextMenuRowProps['onSubmenuKeyDown'];

  const onMouseEnter = () => {
    if (item.disabled) {
      return;
    };
    onRowMouseEnter(item.id);
  };

  return (
    <FloatingNode id={nodeId}>
      <ContextMenuRow
        ref={refs.setReference}
        item={item}
        expanded={open}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onRowMouseLeave}
        onFocus={onRowFocus}
        onSubmenuKeyDown={handleRowKeyDown}
      />

      {open && typeof document !== 'undefined' && createPortal(
        <ContextMenuLevelContext.Provider value={levelContext}>
          <ContextMenuContent
            ref={refs.setFloating}
            style={floatingStyles}
            className={clsx(innerClassNames?.content)}
            {...getFloatingProps({
              onMouseEnter: onPanelMouseEnter,
              onMouseLeave: onPanelMouseLeave
            })}
          >
            <FloatingList elementsRef={listRef}>
              {children}
            </FloatingList>
          </ContextMenuContent>
        </ContextMenuLevelContext.Provider>,
        document.body
      )}
    </FloatingNode>
  );
};

ContextMenuSubmenu.displayName = 'ContextMenuSubmenu';
