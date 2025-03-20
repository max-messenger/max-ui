import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import type { AsChildProp } from '../../../../types';
import styles from './TypographyAction.module.scss';

export type TypographyActionVariant = 'large' | 'medium' | 'small' | 'label' | 'custom';

export interface TypographyActionProps extends ComponentProps<'span'>, AsChildProp {
  variant?: TypographyActionVariant
}

export const TypographyAction = forwardRef<HTMLSpanElement, TypographyActionProps>((props, forwardedRef) => {
  const {
    className,
    variant = 'large',
    asChild,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'span';

  const rootClassName = clsx(
    styles.TypographyAction,
    styles[`TypographyAction_variant_${variant}`],
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

TypographyAction.displayName = 'TypographyAction';
