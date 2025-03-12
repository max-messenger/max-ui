import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import type { AsChildProp } from '../../../../types';
import styles from './TypographyDisplay.module.scss';

export interface TypographyDisplayProps extends ComponentProps<'span'>, AsChildProp {}

export const TypographyDisplay = forwardRef<HTMLSpanElement, TypographyDisplayProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      ref={forwardedRef}
      className={clsx(styles.TypographyDisplay, className)}
      {...rest}
    />
  );
});

TypographyDisplay.displayName = 'TypographyDisplay';
