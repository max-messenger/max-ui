import { clsx } from 'clsx';
import { forwardRef, type HTMLAttributes } from 'react';

import styles from './Steps.module.scss';

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  count: number
  progress: number
}

export const Steps = forwardRef<HTMLDivElement, StepsProps>((props, ref) => {
  const { className, count, progress, ...rest } = props;

  return (
    <div ref={ref} className={clsx(styles.Steps, className)} {...rest}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={clsx(styles.Steps__step, {
            [styles.Steps__step_active]: i < progress
          })}
        />
      ))}
    </div>
  );
});

Steps.displayName = 'Steps';
