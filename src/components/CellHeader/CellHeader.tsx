import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import type { InnerClassNamesProp } from '../../types';
import styles from './CellHeader.module.scss';

export type CellHeaderTitleStyle = 'caps' | 'normal';
export type CellHeaderInnerElementKey = 'content' | 'after';

export interface CellHeaderProps extends ComponentProps<'div'> {
  titleStyle?: CellHeaderTitleStyle
  fullWidth?: boolean
  after?: ReactNode
  innerClassNames?: InnerClassNamesProp<CellHeaderInnerElementKey>

}

export const CellHeader = forwardRef<HTMLDivElement, CellHeaderProps>((props, forwardedRef) => {
  const {
    className,
    titleStyle = 'caps',
    fullWidth = false,
    children,
    after,
    innerClassNames,
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.CellHeader,
    styles[`CellHeader_titleStyle_${titleStyle}`],
    {
      [styles.CellHeader_fullWidth]: fullWidth
    },
    className
  );

  return (
    <div
      ref={forwardedRef}
      className={rootClassName}
      {...rest}
    >
      {hasReactNode(children) && (
        <div className={clsx(styles.CellHeader__content, innerClassNames?.content)}>
          {children}
        </div>
      )}

      {hasReactNode(after) && (
        <div className={clsx(styles.CellHeader__after, innerClassNames?.after)}>
          {after}
        </div>
      )}
    </div>
  );
});

CellHeader.displayName = 'CellHeader';
