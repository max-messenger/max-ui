import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { usePlatform } from '../../hooks';
import styles from './Switch.module.scss';

export interface SwitchProps extends ComponentProps<'input'> {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, forwardedRef) => {
  const {
    className,
    ...rest
  } = props;

  const platform = usePlatform();

  const rootClassName = clsx(
    styles.Switch,
    styles[`Switch_platform_${platform}`],
    className
  );

  return (
    <span className={rootClassName}>
      <input
        ref={forwardedRef}
        type="checkbox"
        role="switch"
        className={styles.Switch__input}
        {...rest}
      />

      <span className={styles.Switch__toggle}>
        <span className={styles.Switch__thumb} />
      </span>
    </span>
  );
});

Switch.displayName = 'Switch';
