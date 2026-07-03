import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef } from 'react';

import { getSubtree } from '../../helpers';
import { useButtonLikeProps, usePlatform } from '../../hooks';
import { Ripple } from '../../internal';
import { type AsChildProp, type InnerClassNamesProp } from '../../types';
import { type ButtonVariant } from '../Button';
import { Spinner } from '../Spinner';
import { getIconButtonSpinnerAppearance, getIconButtonSpinnerSize } from './helpers';
import styles from './IconButton.module.scss';

export type IconButtonSize = 'xsmall' | 'small' | 'medium' | 'large';
export type IconButtonVariant = ButtonVariant;
export type IconButtonInnerElementKey = 'content' | 'spinnerContainer' | 'spinner';

export interface IconButtonProps extends ComponentProps<'button'>, AsChildProp {
  size?: IconButtonSize
  variant?: IconButtonVariant
  disabled?: boolean
  loading?: boolean
  innerClassNames?: InnerClassNamesProp<IconButtonInnerElementKey>
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, forwardedRef) => {
  const {
    children,
    className,
    disabled,
    innerClassNames,
    loading,
    asChild = false,
    size = 'medium',
    variant = 'primary',
    ...rest
  } = props;

  const rootElement: ElementType = 'button';
  const Comp = asChild ? Slot : rootElement;

  const platform = usePlatform();
  const buttonLikeProps = useButtonLikeProps({ asChild, children, disabled, rootElement, loading });

  const inactive = disabled || loading;
  const withRipple = platform === 'android';

  const rootClassName = clsx(
    styles.IconButton,
    styles[`IconButton_variant_${variant}`],
    styles[`IconButton_size_${size}`], {
      [styles.IconButton_loading]: loading,
      [styles.IconButton_disabled]: disabled,
      [styles.IconButton_activeMode_highlight]: !inactive && !withRipple,
      [styles.IconButton_activeMode_ripple]: !inactive && withRipple
    },
    className
  );

  return (
    <Comp
      ref={forwardedRef}
      className={rootClassName}
      {...buttonLikeProps}
      {...rest}
    >
      {loading && (
        <span className={clsx(styles.IconButton__spinnerContainer, innerClassNames?.spinnerContainer)}>
          <Spinner
            className={clsx(innerClassNames?.spinner)}
            size={getIconButtonSpinnerSize(size)}
            appearance={getIconButtonSpinnerAppearance(variant)}
          />
        </span>
      )}

      <Slottable>
        {getSubtree({
          options: { asChild, children },
          content: (children) => (
            <span
              key="subtree-container"
              className={clsx(styles.IconButton__content, innerClassNames?.content)}
            >
              {children}
            </span>
          )
        })}
      </Slottable>

      {withRipple && !inactive && <Ripple className={styles.IconButton__ripple} />}
    </Comp>
  );
});

IconButton.displayName = 'IconButton';
