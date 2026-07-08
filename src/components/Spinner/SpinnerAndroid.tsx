import { type ReactElement } from 'react';

import styles from './Spinner.module.scss';
import { type SpinnerPlatformProps } from './types';

export const SpinnerAndroid = ({ size }: SpinnerPlatformProps): ReactElement => {
  return (
    <div className={styles.androidSpinner} style={{ width: size, height: size }} />
  );
};
