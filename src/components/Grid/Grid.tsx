import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';

import { getCssSizeValue } from '../../helpers';
import { type AsChildProp } from '../../types';
import styles from './Grid.module.scss';

export type GridDisplay = 'grid' | 'inline-grid';
export type GridAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type GridJustify = 'start' | 'center' | 'end' | 'space-between';

export interface GridProps extends ComponentProps<'div'>, AsChildProp {
  display?: GridDisplay
  align?: GridAlign
  justify?: GridJustify
  gap?: number | string
  gapX?: number | string
  gapY?: number | string
  cols?: number
  rows?: number
}

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, forwardedRef) => {
  const {
    className,
    style,
    display = 'grid',
    align = 'start',
    justify = 'start',
    gap,
    gapX,
    gapY,
    cols,
    rows,
    asChild,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={forwardedRef}
      className={clsx(styles.Grid, className)}
      style={{
        justifyContent: justify,
        alignItems: align,
        ...style,
        display,

        '--MaxUi-Grid_gapX': getCssSizeValue(gapX ?? gap ?? 0),
        '--MaxUi-Grid_gapY': getCssSizeValue(gapY ?? gap ?? 0),
        '--MaxUi-Grid_cols': cols ?? 0,
        '--MaxUi-Grid_rows': rows ?? 0
      } as CSSProperties}
      {...rest}
    />
  );
});

Grid.displayName = 'Grid';
