import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import styles from './Dot.module.scss';

export type DotAppearance = 'themed' | 'contrast-pinned' | 'neutral-fade' | 'accent-red' | 'inherit';

export interface DotProps extends ComponentProps<'span'> {
  appearance?: DotAppearance
}

export const Dot = forwardRef<HTMLSpanElement, DotProps>((props, ref) => {
  const {
    className,
    appearance = 'inherit',
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.Dot,
    styles[`Dot_appearance_${appearance}`],
    className
  );

  return (
    <span ref={ref} className={rootClassName} {...rest} />
  );
});

Dot.displayName = 'Dot';
