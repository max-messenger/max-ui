import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import type { AsChildProp } from '../../../../types';
import styles from './TypographyLabel.module.scss';

export type TypographyLabelVariant = 'large' | 'large-strong' | 'large-caps' | 'medium' | 'medium-strong' | 'small-strong' | 'small-caps' | 'custom';

export interface TypographyLabelProps extends ComponentProps<'span'>, AsChildProp {
  variant?: TypographyLabelVariant
}

export const TypographyLabel = forwardRef<HTMLSpanElement, TypographyLabelProps>((props, forwardedRef) => {
  const {
    className,
    variant = 'large',
    asChild,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'span';

  const rootClassName = clsx(
    styles.TypographyLabel,
    styles[`TypographyLabel_variant_${variant}`],
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

TypographyLabel.displayName = 'TypographyLabel';
