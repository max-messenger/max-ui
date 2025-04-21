import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';

import { getCssSizeValue } from '../../helpers';
import { type AsChildProp } from '../../types';
import styles from './Flex.module.scss';

export type FlexDisplay = 'flex' | 'inline-flex';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type FlexJustify = 'start' | 'center' | 'end' | 'space-between';
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

export interface FlexProps extends ComponentProps<'div'>, AsChildProp {
  display?: FlexDisplay
  direction?: FlexDirection
  align?: FlexAlign
  justify?: FlexJustify
  wrap?: FlexWrap
  gap?: number | string
  gapX?: number | string
  gapY?: number | string
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, forwardedRef) => {
  const {
    className,
    display = 'flex',
    direction = 'row',
    align = 'flex-start',
    justify = 'start',
    asChild,
    wrap,
    style,
    gap,
    gapX,
    gapY,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={forwardedRef}
      className={clsx(styles.Flex, className)}
      style={{
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        ...style,
        display,

        '--MaxUi-Flex_gapX': getCssSizeValue(gapX ?? gap ?? 0),
        '--MaxUi-Flex_gapY': getCssSizeValue(gapY ?? gap ?? 0)
      } as CSSProperties}
      {...rest}
    />
  );
});

Flex.displayName = 'Flex';
