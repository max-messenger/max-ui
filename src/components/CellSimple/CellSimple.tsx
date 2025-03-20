import { Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { getSubtree, hasReactNode } from '../../helpers';
import { Icon16Chevron } from '../../icons';
import { type AsChildProp, type InnerClassNamesProp, type MergeProps } from '../../types';
import { Tappable } from '../Tappable';
import styles from './CellSimple.module.scss';

export type CellSimpleHeight = 'compact' | 'normal';
export type CellSimpleInnerElementKey = 'before' | 'after' | 'chevron' | 'content' | 'title' | 'subtitle' | 'overline';

interface CellSimpleOwnProps extends AsChildProp {
  height?: CellSimpleHeight
  innerClassNames?: InnerClassNamesProp<CellSimpleInnerElementKey>
  title?: ReactNode
  subtitle?: ReactNode
  overline?: ReactNode
  before?: ReactNode
  after?: ReactNode
  showChevron?: boolean
  as?: ElementType
  disabled?: boolean
}

export type CellSimpleProps = MergeProps<ComponentProps<'div'>, CellSimpleOwnProps>;

export const CellSimple = forwardRef<HTMLDivElement, CellSimpleProps>((props, forwardedRef) => {
  const {
    className,
    title,
    subtitle,
    before,
    after,
    children,
    overline,
    showChevron = false,
    asChild = false,
    disabled = false,
    innerClassNames,
    height = 'normal',
    as = 'div',
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.CellSimple,
    styles[`CellSimple_height_${height}`],
    {
      [styles.CellSimple_disabled]: disabled
    },
    className
  );

  return (
    <Tappable
      ref={forwardedRef}
      className={rootClassName}
      asChild={asChild}
      as={as}
      parentChildren={children}
      {...rest}
    >
      {hasReactNode(before) && (
        <div className={clsx(styles.CellSimple__before, innerClassNames?.before)}>
          {before}
        </div>
      )}

      <Slottable>
        {getSubtree({ asChild, children }, (children) => (
          <div key="subtree-container" className={clsx(styles.CellSimple__content, innerClassNames?.content)}>
            {hasReactNode(overline) && (
              <div className={clsx(styles.CellSimple__overline, innerClassNames?.overline)}>
                {overline}
              </div>
            )}

            {hasReactNode(title) && (
              <div className={clsx(styles.CellSimple__title, innerClassNames?.title)}>
                {title}
              </div>
            )}

            {hasReactNode(subtitle) && (
              <div className={clsx(styles.CellSimple__subtitle, innerClassNames?.subtitle)}>
                {subtitle}
              </div>
            )}

            {children}
          </div>
        ))}
      </Slottable>

      {(hasReactNode(after) || showChevron) && (
        <div className={clsx(styles.CellSimple__after, innerClassNames?.after)}>
          {after}
          {showChevron && <Icon16Chevron className={clsx(styles.CellSimple__chevron, innerClassNames?.chevron)} />}
        </div>
      )}
    </Tappable>
  );
});

CellSimple.displayName = 'CellSimple';
