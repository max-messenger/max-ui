import { clsx } from 'clsx';
import { forwardRef, type KeyboardEvent, type MouseEvent } from 'react';

import { hasReactNode } from '../../../../helpers';
import { Icon16Chevron } from '../../../../icons';
import { Tappable } from '../../../../internal';
import { useContextMenu } from '../../context';
import { type ContextMenuItem } from '../../types';
import styles from './ContextMenuRow.module.scss';

export interface ContextMenuRowProps {
  item: ContextMenuItem
  /** Открыто ли подменю (desktop) / раскрын ли аккордеон (mobile) */
  expanded?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  className?: string
}

export const ContextMenuRow = forwardRef<HTMLElement, ContextMenuRowProps>((props, forwardedRef) => {
  const {
    item,
    expanded = false,
    onClick,
    onMouseEnter,
    onMouseLeave,
    className
  } = props;

  const { mode, innerClassNames } = useContextMenu();

  const hasSubmenu = item.items !== undefined;

  // Минимальная клавиатурная поддержка: активация пункта по Enter/Space
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    event.currentTarget.click();
  };

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
      ref={forwardedRef}
      role="menuitem"
      aria-haspopup={hasSubmenu ? 'menu' : undefined}
      aria-expanded={hasSubmenu ? expanded : undefined}
      disabled={item.disabled}
      className={rootClassName}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
