import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementRef, forwardRef } from 'react';

import { type AsChildProp } from '../../../../types';
import styles from './TypographyBody.module.scss';

export type TypographyBodyVariant = 'large' | 'medium' | 'small' | 'small-strong' | 'small-caps' | 'custom';

export interface TypographyBodyProps extends ComponentProps<'span'>, AsChildProp {
  variant?: TypographyBodyVariant
}

export const TypographyBody = forwardRef<ElementRef<'span'>, TypographyBodyProps>((props, forwardedRef) => {
  const {
    className,
    variant = 'large-strong',
    asChild,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'span';

  const rootClassName = clsx(
    styles.TypographyBody,
    styles[`TypographyBody_variant_${variant}`],
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

TypographyBody.displayName = 'TypographyBody';
