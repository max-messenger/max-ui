import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef, type ReactNode } from 'react';

import { getSubtree, hasReactNode } from '../../../../helpers';
import { type AsChildProp, type InnerClassNamesProp } from '../../../../types';
import styles from './AvatarContainer.module.scss';
import { AvatarContainerContext } from './AvatarContainerContext';

export type AvatarContainerElementKey = 'overlay' | 'content' | 'rightBottomCorner' | 'rightTopCorner';
export type AvatarContainerSize = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 54 | 56 | 64 | 72 | 80 | 88 | 96 | number;
export type AvatarContainerFrom = 'circle' | 'squircle';

export interface AvatarContainerProps extends ComponentProps<'div'>, AsChildProp {
  size?: AvatarContainerSize
  overlay?: ReactNode
  form?: AvatarContainerFrom
  innerClassNames?: InnerClassNamesProp<AvatarContainerElementKey>
  rightTopCorner?: ReactNode
  rightBottomCorner?: ReactNode
}

export const AvatarContainer = forwardRef<HTMLDivElement, AvatarContainerProps>((props, forwardedRef) => {
  const {
    className,
    style,
    children,
    overlay,
    rightTopCorner,
    rightBottomCorner,
    innerClassNames,
    size = 48,
    asChild,
    form = 'circle',
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'div';

  const rootClassName = clsx(
    styles.AvatarContainer,
    styles[`AvatarContainer_form_${form}`],
    className
  );

  return (
    <AvatarContainerContext.Provider value={{ size }}>
      <Comp
        ref={forwardedRef}
        className={rootClassName}
        style={{
          '--MaxUi-AvatarContainer_size': `${size}px`,
          ...style
        } as CSSProperties}
        {...rest}
      >
        <Slottable>
          {getSubtree({ asChild: props.asChild, children }, (children) => (
            <span
              key="subtree-container"
              className={clsx(styles.AvatarContainer__content, innerClassNames?.content)}
            >
              {children}

              {hasReactNode(overlay) && (
                <span className={clsx(styles.AvatarContainer__overlay, innerClassNames?.overlay)}>
                  {overlay}
                </span>
              )}
            </span>
          ))}
        </Slottable>

        {hasReactNode(rightBottomCorner) && (
          <span className={clsx(styles.AvatarContainer__rightBottomCorner, innerClassNames?.rightBottomCorner)}>
            {rightBottomCorner}
          </span>
        )}

        {hasReactNode(rightTopCorner) && (
          <span className={clsx(styles.AvatarContainer__rightTopCorner, innerClassNames?.rightTopCorner)}>
            {rightTopCorner}
          </span>
        )}
      </Comp>
    </AvatarContainerContext.Provider>
  );
});

AvatarContainer.displayName = 'AvatarContainer';
