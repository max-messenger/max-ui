import clsx from 'clsx';
import {forwardRef} from "react";

import { Typography } from '../Typography';
import styles from './StatusBadge.module.scss';

type Status = 'positive' | 'negative' | 'neutral' | 'warning';
export interface StatusBadgeProps {
  text: string;
  status: Status;
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(({text, status}, forwardRef) => {
  return (
    <Typography.Title
      ref={forwardRef}
      className={clsx(styles.label, {
        [styles.positive]: status === 'positive',
        [styles.warning]: status === 'warning',
        [styles.negative]: status === 'negative',
        [styles.neutral]: status === 'neutral',
      })}
      variant="medium-strong"
    >
      {text}
    </Typography.Title>
  );
});

StatusBadge.displayName = 'StatusBadge';
