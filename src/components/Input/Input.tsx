import { clsx } from 'clsx';
import {
  type ComponentProps,
  forwardRef
} from 'react';

import { type InnerClassNamesProp } from '../../types';
import { ClearableInput } from '../ClearableInput';
import styles from './Input.module.scss';

export type InputMode = 'default' | 'contrast';
export type InputSize = 'large' | 'medium';
export type InputElementKey = 'input' | 'clearButton' | 'body' | 'iconBefore' | 'iconAfter';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  mode?: InputMode
  size?: InputSize
  innerClassNames?: InnerClassNamesProp<InputElementKey>
  withClearButton?: boolean
  count?: number
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  const {
    className,
    innerClassNames,
    withClearButton,
    size = 'large',
    mode = 'primary',
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
    <label className={rootClassName}>
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
    </label>
  );
});

Input.displayName = 'Input';
