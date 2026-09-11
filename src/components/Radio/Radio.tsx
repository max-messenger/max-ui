import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import styles from './Radio.module.scss';

export interface RadioProps extends Omit<ComponentProps<'input'>, 'type'> {}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, forwardedRef) => {
  const {
    className,
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.Radio,
    styles.Radio_animated,
    className
  );

  return (
    <span className={rootClassName}>
      <input
        {...rest}
        ref={forwardedRef}
        type="radio"
        className={styles.Radio__input}
      />

      <span className={styles.Radio__control} />
    </span>
  );
});

Radio.displayName = 'Radio';
