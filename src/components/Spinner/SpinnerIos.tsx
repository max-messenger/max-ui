import { type ReactElement } from 'react';

import styles from './Spinner.module.scss';
import { type SpinnerPlatformProps } from './types';

const BAR_COUNT = 8;

export const SpinnerIos = ({ size }: SpinnerPlatformProps): ReactElement => {
  return (
    <div className={styles.iosSpinner} style={{ width: size, height: size }}>
      {
        Array.from({ length: BAR_COUNT }, (_, index) => (
          <div className={styles.bar} key={index} />
        ))
      }
    </div>
  );
};
