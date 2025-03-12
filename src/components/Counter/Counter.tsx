import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useMemo } from 'react';

import styles from './Counter.module.scss';

export type CounterAppearance = 'themed' | 'neutral' | 'neutral-themed' | 'neutral-static' | 'negative';

export type CounterMode = 'filled' | 'inverse';

export interface CounterProps extends ComponentProps<'span'> {
  value: number

  rounded?: boolean
  appearance?: CounterAppearance
  disabled?: boolean
  muted?: boolean
  mode?: CounterMode
}

export const Counter = forwardRef<HTMLSpanElement, CounterProps>((props, ref) => {
  const {
    className,
    value,
    rounded,
    appearance = 'themed',
    mode = 'filled',
    disabled = false,
    muted = false,
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.Counter,
    styles[`Counter_appearance_${appearance}`],
    styles[`Counter_mode_${mode}`],
    {
      [styles.Counter_disabled]: disabled,
      [styles.Counter_muted]: muted
    },
    className
  );

  const formattedValue = useMemo(() => {
    return rounded
      ? Intl.NumberFormat('en', { notation: 'compact' }).format(value)
      : value;
  }, [rounded, value]);

  return (
    <span ref={ref} className={rootClassName} {...rest} role="">
      {formattedValue}
    </span>
  );
});

Counter.displayName = 'Counter';
