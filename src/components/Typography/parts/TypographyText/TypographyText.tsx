import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import type { AsChildProp } from '../../../../types';
import styles from './TypographyText.module.scss';

export type TypographyTextVariant =
  | 'hero'
  | 'header'
  | 'subheader'
  | 'title'
  | 'body'
  | 'body-strong'
  | 'detail'
  | 'detail-strong'
  | 'description'
  | 'description-strong'
  | 'label'
  | 'label-strong'
  | 'tag'
  | 'tag-strong'
  | 'note'
  | 'note-strong'
  | 'action-large'
  | 'action-medium'
  | 'action-small'
  | 'action-xsmall';

export type TypographyTextColor = 'primary' | 'secondary' | 'tertiary' | 'inherit';

export interface TypographyTextProps extends ComponentProps<'span'>, AsChildProp {
  variant?: TypographyTextVariant
  color?: TypographyTextColor
}

export const TypographyText = forwardRef<HTMLSpanElement, TypographyTextProps>((props, forwardedRef) => {
  const {
    className,
    variant = 'body',
    color = 'inherit',
    asChild,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'span';

  const rootClassName = clsx(
    styles.TypographyText,
    styles[`TypographyText_variant_${variant}`],
    styles[`TypographyText_color_${color}`],
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

TypographyText.displayName = 'TypographyText';
