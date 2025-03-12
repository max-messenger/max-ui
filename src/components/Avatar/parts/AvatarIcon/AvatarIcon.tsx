import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import styles from './AvatarIcon.module.scss';

export interface AvatarIconProps extends ComponentProps<'span'> {}

export const AvatarIcon = forwardRef<HTMLSpanElement, AvatarIconProps>((props, forwardedRef) => {
  const {
    className,
    ...rest
  } = props;

  return (
    <span
      ref={forwardedRef}
      className={clsx(styles.AvatarIcon, className)}
      {...rest}
    />
  );
});

AvatarIcon.displayName = 'AvatarIcon';
