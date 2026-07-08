import { Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type ReactNode } from 'react';

import { getSubtree, hasReactNode } from '../../helpers';
import { Icon16Chevron } from '../../icons';
import { Tappable } from '../../internal';
import { type AsChildProp, type InnerClassNamesProp, type MergeProps } from '../../types';
import styles from './CellSimple.module.scss';

export type CellSimpleHeight = 'compact' | 'normal';
export type CellSimpleInnerElementKey = 'before' | 'after' | 'chevron' | 'content' | 'title' | 'subtitle' | 'overline' | 'link';
export type Appearance = 'default' | 'promo' | 'themed' | 'attention'

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
  separator?: boolean
  link?: string
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
    separator,
    link,
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.CellSimple,
    styles[`CellSimple_height_${height}`],
    {
      [styles.CellSimple_disabled]: disabled,
      [styles.CellSimple_separator]: separator
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
        {getSubtree({
          options: { asChild, children },
          content: (children) => (
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
              {link && (
                <a
                  className={clsx(styles.CellSimple__link, innerClassNames?.link)}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link}
                </a>
              )}
            </div>
          )
        })}
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
