import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type AsChildProp } from '../../../../types';
import styles from './TypographyTitle.module.scss';

export type TypographyTitleVariant = 'large-strong' | 'medium-strong' | 'small' | 'small-strong' | 'custom';

export interface TypographyTitleProps extends ComponentProps<'span'>, AsChildProp {
  variant?: TypographyTitleVariant
}

export const TypographyTitle = forwardRef<HTMLSpanElement, TypographyTitleProps>((props, forwardedRef) => {
  const {
    className,
    variant = 'large-strong',
    asChild,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'span';

  const rootClassName = clsx(
    styles.TypographyTitle,
    styles[`TypographyTitle_variant_${variant}`],
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

TypographyTitle.displayName = 'TypographyTitle';
