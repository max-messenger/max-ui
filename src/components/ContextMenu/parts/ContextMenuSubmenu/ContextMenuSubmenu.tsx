import { autoUpdate, flip, FloatingNode, offset, shift, useFloating, useFloatingNodeId } from '@floating-ui/react';
import { clsx } from 'clsx';
import { type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useContextMenu } from '../../context';
import { COLLISION_PADDING, SUBMENU_OFFSET } from '../../helpers';
import { type ContextMenuItemNested } from '../../types';
import { ContextMenuContent } from '../ContextMenuContent';
import { ContextMenuRow } from '../ContextMenuRow';

export interface ContextMenuSubmenuProps {
  item: ContextMenuItemNested
  open: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onRowMouseEnter: (id: string) => void
  onRowMouseLeave: () => void
  onPanelMouseEnter: () => void
  onPanelMouseLeave: () => void
  /** Содержимое плавающей панели подменю — вложенный ContextMenuList, который рендерит родитель */
  children: ReactNode
}

/** Desktop: строка с подменю + плавающая панель рядом с ней (справа, при нехватке места — слева) */
export const ContextMenuSubmenu = (props: ContextMenuSubmenuProps) => {
  const {
    item,
    open,
    onClick,
    onRowMouseEnter,
    onRowMouseLeave,
    onPanelMouseEnter,
    onPanelMouseLeave,
    children
  } = props;

  const { innerClassNames } = useContextMenu();

  // Связка с родительским узлом FloatingTree: клики по этой панели
  // не считаются «outside press» для корневого меню.
  const nodeId = useFloatingNodeId();

  const { refs, floatingStyles } = useFloating({
    nodeId,
    open,
    placement: 'right-start',
    strategy: 'fixed',
    middleware: [
      offset(SUBMENU_OFFSET),
      flip({ fallbackPlacements: ['left-start'], padding: COLLISION_PADDING }),
      shift({ padding: COLLISION_PADDING })
    ],
    whileElementsMounted: autoUpdate
  });

  return (
    <FloatingNode id={nodeId}>
      <ContextMenuRow
        ref={refs.setReference}
        item={item}
        expanded={open}
        onClick={onClick}
        onMouseEnter={() => {
          onRowMouseEnter(item.id);
        }}
        onMouseLeave={onRowMouseLeave}
      />

      {open && typeof document !== 'undefined' && createPortal(
        <ContextMenuContent
          ref={refs.setFloating}
          style={floatingStyles}
          className={clsx(innerClassNames?.content)}
          onMouseEnter={onPanelMouseEnter}
          onMouseLeave={onPanelMouseLeave}
        >
          {children}
        </ContextMenuContent>,
        document.body
      )}
    </FloatingNode>
  );
};

ContextMenuSubmenu.displayName = 'ContextMenuSubmenu';
