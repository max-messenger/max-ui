import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type AsChildProp } from '../../types';
import styles from './Container.module.scss';

export interface ContainerProps extends ComponentProps<'div'>, AsChildProp {
  fullWidth?: boolean
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    fullWidth,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'div';

  const rootClassName = clsx(
    styles.Container,
    {
      [styles.Container_fullWidth]: fullWidth
    },
    className
  );

  return (
    <Comp
      ref={forwardedRef}
      className={rootClassName}
      {...rest}
    />
  );
});

Container.displayName = 'Container';
