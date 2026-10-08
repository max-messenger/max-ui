import { useListItem } from '@floating-ui/react';
import { clsx } from 'clsx';
import { type FocusEvent, forwardRef, type KeyboardEvent, type MouseEvent } from 'react';

import { hasReactNode, mergeRefs } from '../../../../helpers';
import { Icon16Chevron } from '../../../../icons';
import { Tappable } from '../../../../internal';
import { useContextMenu, useContextMenuLevel } from '../../context';
import { type ContextMenuItem } from '../../types';
import styles from './ContextMenuRow.module.scss';

export interface ContextMenuRowProps {
  item: ContextMenuItem
  expanded?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus?: (event: FocusEvent<HTMLElement>) => void
  onSubmenuKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
  className?: string
}

export const ContextMenuRow = forwardRef<HTMLElement, ContextMenuRowProps>((props, forwardedRef) => {
  const {
    item,
    expanded = false,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onSubmenuKeyDown,
    className
  } = props;

  const { mode, innerClassNames } = useContextMenu();
  const { activeIndex, getItemProps } = useContextMenuLevel();

  const { ref: listItemRef, index } = useListItem();

  const hasSubmenu = item.items !== undefined;

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    // Активация пункта по Enter/Space — как клик
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!item.disabled) event.currentTarget.click();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();

      // Desktop: открытие подменю по стрелке обрабатывает onSubmenuKeyDown
      // (useListNavigation вложенного уровня). Mobile: раскрываем аккордеон.
      if (!item.disabled && hasSubmenu && mode === 'mobile') {
        event.currentTarget.click();
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
    }
  };

  const itemProps = getItemProps({
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onKeyDown: (event) => {
      onSubmenuKeyDown?.(event);
      handleKeyDown(event);
    }
  });

  const rootClassName = clsx(
    styles.ContextMenuRow,
    {
      [styles.ContextMenuRow_destructive]: item.mode === 'destructive',
      [styles.ContextMenuRow_disabled]: item.disabled,
      [styles.ContextMenuRow_expanded]: expanded,
      [styles.ContextMenuRow_hasSubmenu]: hasSubmenu
    },
    innerClassNames?.row,
    className
  );

  return (
    <Tappable
      ref={mergeRefs<HTMLElement>(forwardedRef, listItemRef)}
      role="menuitem"
      aria-haspopup={hasSubmenu ? 'menu' : undefined}
      aria-expanded={hasSubmenu ? expanded : undefined}
      disabled={item.disabled}
      className={rootClassName}
      tabIndex={item.disabled || activeIndex !== index ? -1 : 0}
      {...itemProps}
    >
      {(hasReactNode(item.before) || item.offset) && (
        <span className={clsx(styles.ContextMenuRow__before, innerClassNames?.before)}>
          {item.before}
        </span>
      )}

      <span className={clsx(styles.ContextMenuRow__label, innerClassNames?.label)}>
        {item.label}
      </span>

      {!hasSubmenu && hasReactNode(item.hint) && (
        <span className={clsx(styles.ContextMenuRow__hint, innerClassNames?.hint)}>
          {item.hint}
        </span>
      )}

      {hasSubmenu && (
        <Icon16Chevron
          className={clsx(
            styles.ContextMenuRow__chevron,
            styles[`ContextMenuRow__chevron_${mode}`],
            { [styles.ContextMenuRow__chevron_expanded]: expanded },
            innerClassNames?.chevron
          )}
        />
      )}
    </Tappable>
  );
});

ContextMenuRow.displayName = 'ContextMenuRow';
