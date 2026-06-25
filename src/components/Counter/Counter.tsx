import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useMemo } from 'react';

import styles from './Counter.module.scss';

export type CounterVariant = 'primary' | 'primary-contrast' | 'attention' | 'attention-contrast' | 'promo' | 'static' | 'static-contrast' | 'default' | 'mute' | 'menu';

export interface CounterProps extends ComponentProps<'span'> {
  value: number
  variant?: CounterVariant
  rounded?: boolean
}

export const Counter = forwardRef<HTMLSpanElement, CounterProps>((props, ref) => {
  const {
    className,
    value,
    rounded,
    variant = 'primary',
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.Counter,
    styles[`Counter_variant_${variant}`],
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
