import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useRef, useState } from 'react';

import { dispatchChangeNativeEvent, mergeRefs } from '../../helpers';
import { Icon16CloseIos } from '../../icons';
import { type InnerClassNamesProp } from '../../types';
import { SvgButton } from '../SvgButton';
import styles from './ClearableInput.module.scss';

export type ClearableInputElementKey = 'input' | 'clearButton' | 'count';

export interface ClearableInputProps extends ComponentProps<'input'> {
  innerClassNames?: InnerClassNamesProp<ClearableInputElementKey>
  withClearButton?: boolean
  count?: number
}

const isInputValueEmpty = (value: ClearableInputProps['value']): boolean => (
  value === undefined || value === '' || (Array.isArray(value) && value.length === 0)
);

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
  const isControlled = rest.value !== undefined;
  const [isUncontrolledEmpty, setIsUncontrolledEmpty] = useState(
    () => isInputValueEmpty(rest.defaultValue)
  );
  const isEmpty = isControlled ? isInputValueEmpty(rest.value) : isUncontrolledEmpty;

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
          if (!isControlled) {
            setIsUncontrolledEmpty(e.currentTarget.value === '');
          }
          onChange?.(e);
        }}
        disabled={disabled}
        {...rest}
      />
      {!isEmpty && !disabled && !!count && (

        <div
          className={clsx(styles.ClearableInput__count, innerClassNames?.count)}
        >
          {count}
        </div>
      )}
      {!isEmpty && !disabled && withClearButton && (
        <SvgButton
          type="button"
          className={clsx(styles.ClearableInput__button, innerClassNames?.clearButton)}
          onClick={clearValue}
          aria-label="Очистить"
        >
          <Icon16CloseIos />
        </SvgButton>
      )}
    </span>
  );
});

ClearableInput.displayName = 'ClearableInput';
