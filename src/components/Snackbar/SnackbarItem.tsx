import { clsx } from 'clsx';
import {ComponentRef, forwardRef, useCallback} from 'react';

import {hasReactNode} from "../../helpers";
import { Typography } from '../Typography';
import styles from './Snackbar.module.scss';
import type { SnackbarQueueItem } from './types';

export interface SnackbarItemProps extends SnackbarQueueItem {
  onExited?: (id: string) => void;
}

export const SnackbarItem = forwardRef<ComponentRef<'div'>, SnackbarItemProps>((props, ref) => {
  const {
    id,
    caption,
    before,
    after,
    text,
    placement,
    leaving,
    onExited,
    ...rest
  } = props;

  const handleAnimationEnd = useCallback(() => {
    if (leaving) onExited?.(id);
  }, [leaving, onExited, id]);

  const rootClassName = clsx(
    styles.SnackbarItem,
    styles[`SnackbarItem_placement_${placement}`],
    leaving && styles.SnackbarItem_leaving
  );

  return (
    <div
      ref={ref}
      className={rootClassName}
      role="status"
      data-placement={placement}
      data-leaving={leaving || undefined}
      onAnimationEnd={handleAnimationEnd}
      onClick={() => onExited?.(id)}
      {...rest}
    >
      {hasReactNode(before) && <div className={styles.before}>{before}</div>}

      {(!!text || !!caption) && (
        <div className={styles.textContainer}>
          {!!text && (
            <Typography.Body className={styles.text} variant="large">
              {text}
            </Typography.Body>
          )}

          {!!caption && (
            <Typography.Body className={styles.caption} variant="small">
              {caption}
            </Typography.Body>
          )}
        </div>
      )}

      {hasReactNode(after) && <div className={styles.after}>{after}</div>}
    </div>
  );
});

SnackbarItem.displayName = 'SnackbarItem';
