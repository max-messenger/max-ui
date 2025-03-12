import { Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { getSubtree, hasReactNode } from '../../helpers';
import { type AsChildProp, type InnerClassNamesProp } from '../../types';
import { EllipsisText } from '../EllipsisText';
import { Tappable } from '../Tappable';
import styles from './ToolButton.module.scss';

export type ToolButtonAppearance = 'default' | 'secondary';
export type ToolButtonElementKey = 'label' | 'icon';

export interface ToolButtonProps extends ComponentProps<'button'>, AsChildProp {
  icon?: ReactNode
  innerClassNames?: InnerClassNamesProp<ToolButtonElementKey>
  appearance?: ToolButtonAppearance
}

export const ToolButton = forwardRef<HTMLButtonElement, ToolButtonProps>((props, forwardedRef) => {
  const {
    className,
    icon,
    children,
    asChild,
    innerClassNames,
    appearance = 'default',
    disabled = false,
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.ToolButton,
    styles[`ToolButton_appearance_${appearance}`],
    {
      [styles.ToolButton_withLabel]: hasReactNode(children),
      [styles.ToolButton_disabled]: disabled
    },
    className
  );

  return (
    <Tappable
      ref={forwardedRef}
      className={rootClassName}
      as="button"
      parentChildren={children}
      asChild={asChild}
      disabled={disabled}
      {...rest}
    >
      {hasReactNode(icon) && (
        <span className={clsx(styles.ToolButton__icon, innerClassNames?.icon)}>
          {icon}
        </span>
      )}

      {hasReactNode(children) && (
        <Slottable>
          {getSubtree({ asChild, children }, (children) => (
            <EllipsisText
              key="subtree-container"
              maxLines={1}
              className={clsx(styles.ToolButton__label, innerClassNames?.label)}
            >
              {children}
            </EllipsisText>
          ))}
        </Slottable>
      )}
    </Tappable>
  );
});

ToolButton.displayName = 'ToolButton';
