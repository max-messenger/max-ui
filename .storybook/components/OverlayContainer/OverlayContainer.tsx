import { clsx } from 'clsx';
import { type ComponentProps, type FC } from 'react';

import styles from './OverlayContainer.module.scss';

export interface OverlayContainerProps extends ComponentProps<'div'> {
  appearance?: 'light' | 'dark'
}

export const OverlayContainer: FC<OverlayContainerProps> = (props) => {
  const {
    className,
    appearance = 'light',
    ...rest
  } = props;

  const rootClassName = clsx(
    className,
    styles.OverlayContainer,
    styles[`OverlayContainer_appearance_${appearance}`]
  );

  return (
    <div
      className={rootClassName}
      {...rest}
    />
  );
};
