import {
  autoUpdate,
  flip,
  FloatingList,
  FloatingNode,
  FloatingTree,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useHover,
  useInteractions,
  useListNavigation,
  useRole
} from '@floating-ui/react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ElementType, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { mergeRefs } from '../../helpers';
import {
  ContextMenuContext,
  type ContextMenuContextInterface,
  ContextMenuLevelContext,
  type ContextMenuLevelInterface
} from './context';
import styles from './ContextMenu.module.scss';
import {
  COLLISION_PADDING,
  MENU_OFFSET,
  normalizeOpenOn,
  TRIGGER_HOVER_DELAY,
  useResolvedMode
} from './helpers';
import { ContextMenuActionBar } from './parts/ContextMenuActionBar';
import { ContextMenuContent } from './parts/ContextMenuContent';
import { ContextMenuList } from './parts/ContextMenuList';
import { type ContextMenuProps } from './types';

const ContextMenuInner = forwardRef<HTMLElement, ContextMenuProps>((props, forwardedRef) => {
  const {
    items,
    actionBar,
    children,
    className,
    openOn = 'click',
    mode = 'auto',
    placement = 'bottom-start',
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    asChild = false,
    innerClassNames
  } = props;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? Boolean(controlledOpen) : uncontrolledOpen;

  const resolvedMode = useResolvedMode(mode);

  // Идентификатор узла в FloatingTree: позволяет useDismiss отличать клики
  // по порталу подменю (дочерний узел) от кликов вне меню.
  const nodeId = useFloatingNodeId();

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (!isControlled) setUncontrolledOpen(nextOpen);

    onOpenChange?.(nextOpen);
  }, [isControlled, onOpenChange]);

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open,
    onOpenChange: handleOpenChange,
    placement,
    strategy: 'fixed',
    middleware: [
      offset(MENU_OFFSET),
      flip({ padding: COLLISION_PADDING }),
      shift({ padding: COLLISION_PADDING })
    ],
    whileElementsMounted: autoUpdate
  });

  const openOnList = useMemo(() => normalizeOpenOn(openOn), [openOn]);

  const click = useClick(context, {
    enabled: openOnList.includes('click'),
    toggle: true
  });
  const hover = useHover(context, {
    enabled: openOnList.includes('hover'),
    delay: TRIGGER_HOVER_DELAY
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });

  // Навигация по пунктам стрелками: ↑/↓ и Home/End; неактивные (aria-disabled) пункты
  // пропускаются. ↓/↑ на триггере открывают меню и фокусируют первый/последний пункт.
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([click, hover, dismiss, role, listNavigation]);

  const levelContext = useMemo<ContextMenuLevelInterface>(() => ({
    activeIndex,
    getItemProps
  }), [activeIndex, getItemProps]);

  const close = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  // После закрытия меню возвращаем фокус на триггер, если он потерялся:
  // фокус был на пункте меню, а портал вместе с ним размонтировался.
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      return;
    }

    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;

    if (typeof document !== 'undefined' && document.activeElement === document.body) {
      (refs.domReference.current as HTMLElement | null)?.focus();
    }
  }, [open, refs]);

  const contextValue = useMemo<ContextMenuContextInterface>(() => ({
    mode: resolvedMode,
    close,
    innerClassNames
  }), [resolvedMode, close, innerClassNames]);

  const TriggerComponent: ElementType = asChild ? Slot : 'span';

  return (
    <FloatingNode id={nodeId}>
      <TriggerComponent
        ref={mergeRefs<HTMLElement>(forwardedRef, refs.setReference)}
        className={clsx(!asChild && styles.ContextMenu__trigger, className, innerClassNames?.trigger)}
        tabIndex={asChild ? undefined : 0}
        {...getReferenceProps()}
      >
        {children}
      </TriggerComponent>

      {open && typeof document !== 'undefined' && createPortal(
        <ContextMenuContext.Provider value={contextValue}>
          <ContextMenuContent
            ref={refs.setFloating}
            style={floatingStyles}
            className={clsx(innerClassNames?.content)}
            {...getFloatingProps({
              onKeyDown: (event) => {
                // Tab уводит фокус из меню — закрываем его, как нативные меню
                if (event.key === 'Tab') close();
              }
            })}
          >
            {actionBar && <ContextMenuActionBar buttons={actionBar} />}

            <ContextMenuLevelContext.Provider value={levelContext}>
              <FloatingList elementsRef={listRef}>
                <ContextMenuList items={items} />
              </FloatingList>
            </ContextMenuLevelContext.Provider>
          </ContextMenuContent>
        </ContextMenuContext.Provider>,
        document.body
      )}
    </FloatingNode>
  );
});

ContextMenuInner.displayName = 'ContextMenuInner';

/**
 * Дерево плавающих узлов: рут и все панели подменю регистрируются в нём,
 * чтобы клики по порталу подменю не считались «outside press» для корневого меню.
 * Хуки внутреннего компонента должны выполняться внутри провайдера,
 * поэтому ContextMenu вынесен в отдельный wrapper.
 */
export const ContextMenu = forwardRef<HTMLElement, ContextMenuProps>((props, forwardedRef) => (
  <FloatingTree>
    <ContextMenuInner {...props} ref={forwardedRef} />
  </FloatingTree>
));

ContextMenu.displayName = 'ContextMenu';
