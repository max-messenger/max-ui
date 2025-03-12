import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { useAvatarContainerContext } from '../AvatarContainer/AvatarContainerContext';
import styles from './AvatarOnlineDot.module.scss';
import { getDotContainerSize } from './helpers';

export interface AvatarOnlineDotProps extends ComponentProps<'span'> {}

export const AvatarOnlineDot = forwardRef<HTMLSpanElement, AvatarOnlineDotProps>((props, forwardedRef) => {
  const {
    className,
    ...rest
  } = props;

  const { size: avatarContainerSize } = useAvatarContainerContext();

  const size = getDotContainerSize(avatarContainerSize);

  const rootClassName = clsx(
    styles.AvatarOnlineDot,
    styles[`AvatarOnlineDot_size_${size}`],
    className
  );

  return (
    <span
      ref={forwardedRef}
      className={rootClassName}
      {...rest}
    >
      <span className={styles.AvatarOnlineDot__dot} />
    </span>
  );
});

AvatarOnlineDot.displayName = 'AvatarOnlineDot';
