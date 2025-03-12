import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import type { AsChildProp } from '../../../../types';
import styles from './TypographyHeadline.module.scss';

export type TypographyHeadlineVariant = 'large-strong' | 'medium' | 'medium-strong' | 'small' | 'small-strong' | 'custom';

export interface TypographyHeadlineProps extends ComponentProps<'span'>, AsChildProp {
  variant?: TypographyHeadlineVariant
}

export const TypographyHeadline = forwardRef<HTMLSpanElement, TypographyHeadlineProps>((props, forwardedRef) => {
  const {
    className,
    variant = 'large-strong',
    asChild,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'span';

  const rootClassName = clsx(
    styles.TypographyHeadline,
    styles[`TypographyHeadline_variant_${variant}`],
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

TypographyHeadline.displayName = 'TypographyHeadline';
