import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type MouseEventHandler } from 'react';

import styles from './AvatarOverlay.module.scss';

export interface AvatarOverlayProps extends ComponentProps<'span'> {}

export const AvatarOverlay = forwardRef<HTMLSpanElement, AvatarOverlayProps>((props, forwardedRef) => {
  const {
    className,
    onClick,
    ...rest
  } = props;

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick?.(e);
  };

  return (
    <span
      ref={forwardedRef}
      className={clsx(styles.AvatarOverlay, className)}
      onClick={clickHandler}
      {...rest}
    />
  );
});

AvatarOverlay.displayName = 'AvatarOverlay';
