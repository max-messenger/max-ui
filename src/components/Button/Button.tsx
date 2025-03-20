import { Slot, Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { getSubtree, hasReactNode } from '../../helpers';
import { useButtonLikeProps, usePlatform } from '../../hooks';
import { type AsChildProp, type InnerClassNamesProp } from '../../types';
import { EllipsisText } from '../EllipsisText';
import { Ripple } from '../Ripple';
import { Spinner } from '../Spinner';
import styles from './Button.module.scss';
import { getButtonSpinnerAppearance, getButtonSpinnerSize, injectButtonIndicator } from './helpers';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonMode = 'primary' | 'secondary' | 'tertiary' | 'link';
export type ButtonAppearance = 'themed' | 'negative' | 'neutral' | 'neutral-themed' | 'contrast-static';
export type ButtonInnerElementKey = 'iconBefore' | 'iconAfter' | 'indicator' | 'content' | 'spinnerContainer' | 'spinner';

export interface ButtonProps extends ComponentProps<'button'>, AsChildProp {
  size?: ButtonSize
  mode?: ButtonMode
  appearance?: ButtonAppearance
  stretched?: boolean
  iconBefore?: ReactNode
  iconAfter?: ReactNode
  indicator?: ReactNode
  innerClassNames?: InnerClassNamesProp<ButtonInnerElementKey>
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const {
    className,
    iconBefore,
    iconAfter,
    indicator,
    children,
    onClick,
    loading,
    disabled = false,
    asChild = false,
    innerClassNames,
    stretched = false,
    size = 'medium',
    mode = 'primary',
    appearance = 'themed',
    ...rest
  } = props;

  const rootElement: ElementType = 'button';
  const Comp = asChild ? Slot : rootElement;

  const platform = usePlatform();
  const buttonLikeProps = useButtonLikeProps({ asChild, children, disabled, rootElement, loading });
  const inactive = disabled || loading;
  const withRipple = platform === 'android' && mode !== 'link';

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (loading) return;
    onClick?.(e);
  };

  const rootClassName = clsx(
    styles.Button,
    styles[`Button_appearance_${appearance}`],
    styles[`Button_mode_${mode}`],
    styles[`Button_size_${size}`], {
      [styles.Button_loading]: loading,
      [styles.Button_disabled]: disabled,
      [styles.Button_stretched]: stretched,
      [styles.Button_activeMode_highlight]: !inactive && !withRipple,
      [styles.Button_activeMode_ripple]: !inactive && withRipple
    },
    className
  );

  return (
    <Comp
      ref={forwardedRef}
      className={rootClassName}
      onClick={clickHandler}
      {...buttonLikeProps}
      {...rest}
    >
      {hasReactNode(iconBefore) && (
        <span className={clsx(styles.Button__iconBefore, innerClassNames?.iconBefore)}>
          {iconBefore}
        </span>
      )}

      {loading && (
        <span className={clsx(styles.Button__spinnerContainer, innerClassNames?.spinnerContainer)}>
          <Spinner
            className={clsx(innerClassNames?.spinner)}
            size={getButtonSpinnerSize(size)}
            appearance={getButtonSpinnerAppearance(appearance, mode)}
          />
        </span>
      )}

      <Slottable>
        {getSubtree({ asChild, children }, (children) => (
          <EllipsisText
            key="subtree-container"
            className={clsx(styles.Button__content, innerClassNames?.content)}
          >
            {children}
          </EllipsisText>
        ))}
      </Slottable>

      {hasReactNode(indicator) && (
        <span className={clsx(styles.Button__indicator, innerClassNames?.indicator)}>
          {injectButtonIndicator(
            indicator,
            appearance,
            mode,
            disabled
          )}
        </span>
      )}

      {hasReactNode(iconAfter) && (
        <span className={clsx(styles.Button__iconAfter, innerClassNames?.iconAfter)}>
          {iconAfter}
        </span>
      )}

      {withRipple && !inactive && <Ripple className={styles.Button__ripple} />}
    </Comp>
  );
});

Button.displayName = 'Button';
