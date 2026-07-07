import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import styles from './Panel.module.scss';

export type PanelMode = 'primary' | 'secondary';

export interface PanelProps extends ComponentProps<'div'> {
  mode?: PanelMode
  centeredX?: boolean
  centeredY?: boolean
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, forwardedRef) => {
  const {
    className,
    mode = 'primary',
    centeredX,
    centeredY,
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.Panel,
    styles[`Panel_mode_${mode}`],
    {
      [styles.Panel_centeredX]: centeredX,
      [styles.Panel_centeredY]: centeredY
    },
    className
  );

  return (
    <div
      ref={forwardedRef}
      className={rootClassName}
      {...rest}
    />
  );
});

Panel.displayName = 'Panel';
