import { clsx } from 'clsx';
import { type HTMLAttributes } from 'react';

import styles from './ContextMenuDivider.module.scss';

export type ContextMenuDividerProps = HTMLAttributes<HTMLDivElement>;

export const ContextMenuDivider = ({ className, ...rest }: ContextMenuDividerProps) => {
  return (
    <div
      role="separator"
      className={clsx(styles.ContextMenuDivider, className)}
      {...rest}
    />
  );
};

ContextMenuDivider.displayName = 'ContextMenuDivider';
