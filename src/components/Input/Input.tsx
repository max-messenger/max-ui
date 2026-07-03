import { clsx } from 'clsx';
import {
  type ComponentProps,
  forwardRef, type ReactNode
} from 'react';

import { hasReactNode } from '../../helpers';
import { type InnerClassNamesProp } from '../../types';
import { ClearableInput } from '../ClearableInput';
import styles from './Input.module.scss';

export type InputMode = 'default' | 'contrast';
export type InputSize = 'large' | 'medium';
export type InputElementKey = 'input' | 'clearButton' | 'body' | 'iconBefore' | 'iconAfter' | 'hint';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  mode?: InputMode
  size?: InputSize
  iconBefore?: ReactNode
  iconAfter?: ReactNode
  innerClassNames?: InnerClassNamesProp<InputElementKey>
  withClearButton?: boolean
  count?: number
  hint?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  const {
    className,
    innerClassNames,
    withClearButton,
    iconBefore,
    iconAfter,
    size = 'large',
    mode = 'primary',
    hint,
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.Input,
    styles[`Input_mode_${mode}`],
    styles[`Input_size_${size}`],
    {
      [styles.Input_disabled]: rest.disabled
    },
    className
  );

  return (
    <>
      <label className={rootClassName}>
        {hasReactNode(iconBefore) && (
          <div className={clsx(styles.Input__iconBefore, innerClassNames?.iconBefore)}>
            {iconBefore}
          </div>
        )}

        <ClearableInput
          ref={forwardedRef}
          className={clsx(styles.Input__body, innerClassNames?.body)}
          withClearButton={withClearButton}
          innerClassNames={{
            input: clsx(styles.Input__input, innerClassNames?.input),
            clearButton: clsx(styles.Input__clearButton, innerClassNames?.clearButton)
          }}
          {...rest}
        />

        {hasReactNode(iconAfter) && (
          <div className={clsx(styles.Input__iconAfter, innerClassNames?.iconAfter)}>
            {iconAfter}
          </div>
        )}
      </label>
      <div className={clsx(styles.Input__hint, innerClassNames?.hint)}>{hint}</div>
    </>
  );
});

Input.displayName = 'Input';
