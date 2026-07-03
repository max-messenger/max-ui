import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useRef, useState } from 'react';

import { dispatchChangeNativeEvent, mergeRefs } from '../../helpers';
import { Icon20CloseAndroid } from '../../icons';
import { type InnerClassNamesProp } from '../../types';
import { SvgButton } from '../SvgButton';
import styles from './ClearableInput.module.scss';

export type ClearableInputElementKey = 'input' | 'clearButton';

export interface ClearableInputProps extends ComponentProps<'input'> {
  innerClassNames?: InnerClassNamesProp<ClearableInputElementKey>
  withClearButton?: boolean
  count?: number
}

export const ClearableInput = forwardRef<HTMLInputElement, ClearableInputProps>((props, forwardedRef) => {
  const {
    className,
    onChange,
    innerClassNames,
    withClearButton = true,
    disabled,
    count,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = useState(!rest.value && !rest.defaultValue);

  const clearValue = (): void => {
    if (!inputRef.current) return;
    dispatchChangeNativeEvent({ el: inputRef.current, value: '' });
  };

  return (
    <span className={clsx(styles.ClearableInput, className)}>
      <input
        ref={mergeRefs(inputRef, forwardedRef)}
        className={clsx(innerClassNames?.input)}
        onChange={(e) => {
          onChange?.(e);
          setIsEmpty(!e.target.value);
        }}
        disabled={disabled}
        {...rest}
      />
      {!isEmpty && !disabled && !!count && (

        <SvgButton
          className={clsx(styles.ClearableInput__button, innerClassNames?.clearButton)}
        >
          {count}
        </SvgButton>
      )}
      {!isEmpty && !disabled && withClearButton && (
        <SvgButton
          className={clsx(styles.ClearableInput__button, innerClassNames?.clearButton)}
          onClick={clearValue}
          aria-label="Очистить"
        >
          <Icon20CloseAndroid />
        </SvgButton>
      )}
    </span>
  );
});

ClearableInput.displayName = 'ClearableInput';
