import { clsx } from 'clsx';
import { type MouseEvent } from 'react';

import { hasReactNode } from '../../../../helpers';
import { Tappable } from '../../../../internal';
import { useContextMenu } from '../../context';
import { type ContextMenuActionBar as ContextMenuActionBarButtons,type ContextMenuActionButton } from '../../types';
import { ContextMenuDivider } from '../ContextMenuDivider';
import styles from './ContextMenuActionBar.module.scss';

export interface ContextMenuActionBarProps {
  buttons: ContextMenuActionBarButtons
}

export const ContextMenuActionBar = ({ buttons }: ContextMenuActionBarProps) => {
  const { close, innerClassNames } = useContextMenu();

  const handleClick = (button: ContextMenuActionButton) => (event: MouseEvent<HTMLElement>) => {
    button.onClick?.(event);
    close();
  };

  return (
    <>
      <div
        role="none"
        className={clsx(styles.ContextMenuActionBar, innerClassNames?.actionBar)}
      >
        {buttons.map((button) => (
          <Tappable
            key={button.id}
            as="button"
            type="button"
            disabled={button.disabled}
            className={clsx(styles.ContextMenuActionBar__button, innerClassNames?.actionBarButton)}
            onClick={handleClick(button)}
          >
            <span className={clsx(styles.ContextMenuActionBar__icon, innerClassNames?.actionBarButtonIcon)}>
              {button.icon}
            </span>

            {hasReactNode(button.label) && (
              <span className={clsx(styles.ContextMenuActionBar__label, innerClassNames?.actionBarButtonLabel)}>
                {button.label}
              </span>
            )}
          </Tappable>
        ))}
      </div>

      {/* По спеке после Action bar всегда идёт Divider — добавляем автоматически */}
      <ContextMenuDivider className={clsx(innerClassNames?.divider)} />
    </>
  );
};

ContextMenuActionBar.displayName = 'ContextMenuActionBar';
