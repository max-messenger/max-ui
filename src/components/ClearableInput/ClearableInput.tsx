import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode, useRef, useState } from 'react';

import { dispatchChangeNativeEvent, mergeRefs } from '../../helpers';
import { usePlatform } from '../../hooks';
import { Icon16CloseIos, Icon20CloseAndroid } from '../../icons';
import { type InnerClassNamesProp, type PlatformType } from '../../types';
import { SvgButton } from '../SvgButton';
import styles from './ClearableInput.module.scss';

const clearIconsMapping: Record<PlatformType, ReactNode> = {
  ios: <Icon16CloseIos />,
  android: <Icon20CloseAndroid />
};

export type ClearableInputElementKey = 'input' | 'clearButton';

export interface ClearableInputProps extends ComponentProps<'input'> {
  innerClassNames?: InnerClassNamesProp<ClearableInputElementKey>
  withClearButton?: boolean
}

export const ClearableInput = forwardRef<HTMLInputElement, ClearableInputProps>((props, forwardedRef) => {
  const {
    className,
    onChange,
    innerClassNames,
    withClearButton = true,
    disabled,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = useState(!rest.value && !rest.defaultValue);

  const platform = usePlatform();

  const clearValue = (): void => {
    if (!inputRef.current) return;
    dispatchChangeNativeEvent(inputRef.current);
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

      {!isEmpty && !disabled && withClearButton && (
        <SvgButton
          className={clsx(styles.ClearableInput__button, innerClassNames?.clearButton)}
          onClick={clearValue}
          aria-label="Очистить"
        >
          {clearIconsMapping[platform]}
        </SvgButton>
      )}
    </span>
  );
});

ClearableInput.displayName = 'ClearableInput';
