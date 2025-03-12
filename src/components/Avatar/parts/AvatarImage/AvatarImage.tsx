import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode, useLayoutEffect, useState } from 'react';

import { type ImageLoadingStatus, useCallbackRef, useImageLoadingStatus } from '../../../../hooks';
import { AvatarText, type AvatarTextGradient } from '../AvatarText';
import styles from './AvatarImage.module.scss';

export interface AvatarImageProps extends ComponentProps<'img'> {
  fallback?: ReactNode
  fallbackGradient?: AvatarTextGradient
}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>((props, forwardedRef) => {
  const {
    className,
    fallback,
    fallbackGradient = 'red',
    ...rest
  } = props;

  const [status, setStatus] = useState<ImageLoadingStatus>('idle');

  const imageLoadingStatus = useImageLoadingStatus(rest.src ?? rest.srcSet, rest.referrerPolicy);
  const handleLoadingStatusChange = useCallbackRef((status: ImageLoadingStatus) => {
    setStatus(status);
  });

  useLayoutEffect(() => {
    if (imageLoadingStatus !== 'idle') {
      handleLoadingStatusChange(imageLoadingStatus);
    }
  }, [imageLoadingStatus, handleLoadingStatusChange]);

  if (status === 'error') {
    return (
      <AvatarText gradient={fallbackGradient}>
        {fallback}
      </AvatarText>
    );
  }

  return (
    <img
      ref={forwardedRef}
      className={clsx(styles.AvatarImage, className)}
      {...rest}
    />
  );
});

AvatarImage.displayName = 'AvatarImage';
