import { clsx } from 'clsx';
import { forwardRef } from 'react';

import { usePlatform } from '../../hooks';
import styles from './Spinner.module.scss';
import { SpinnerAndroid } from './SpinnerAndroid';
import { SpinnerIos } from './SpinnerIos';
import { type SpinnerProps } from './types';

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>((props, forwardedRef) => {
  const {
    className,
    size = 20,
    appearance = 'primary',
    ...rest
  } = props;
  const platform = usePlatform();

  const rootClassName = clsx(
    styles.Spinner,
    styles[`Spinner_appearance_${appearance}`],
    className,
    { [styles.Spinner__android]: platform === 'android' }
  );
  const PlatformSpinner = platform === 'ios' ? SpinnerIos : SpinnerAndroid;

  return (
    <span
      ref={forwardedRef}
      role="status"
      className={rootClassName}
      {...rest}
    >
      <PlatformSpinner size={size} />
    </span>
  );
});

Spinner.displayName = 'Spinner';
