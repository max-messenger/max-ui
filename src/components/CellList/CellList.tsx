import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import styles from './CellList.module.scss';

export type CellListMode = 'full-width' | 'island';

export interface CellListProps extends ComponentProps<'div'> {
  mode?: CellListMode
  filled?: boolean
  header?: ReactNode
}

export const CellList = forwardRef<HTMLDivElement, CellListProps>((props, forwardedRef) => {
  const {
    className,
    header,
    children,
    mode = 'full-width',
    filled = mode === 'island',
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.CellList,
    styles[`CellList_mode_${mode}`], {
      [styles.CellList_filled]: filled
    },
    className
  );

  return (
    <div
      ref={forwardedRef}
      className={rootClassName}
      {...rest}
    >
      {hasReactNode(header) && (
        <div className={styles.CellList__header}>{header}</div>
      )}

      <div className={styles.CellList__body}>
        {children}
      </div>
    </div>
  );
});

CellList.displayName = 'CellList';
