import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type AsChildProp } from '../../types';
import styles from './SvgButton.module.scss';

export interface SvgButtonProps extends ComponentProps<'button'>, AsChildProp {}

export const SvgButton = forwardRef<HTMLButtonElement, SvgButtonProps>((props, forwardedRef) => {
  const { className, asChild, ...rest } = props;

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={forwardedRef}
      className={clsx(styles.SvgButton, className)}
      {...rest}
    />
  );
});

SvgButton.displayName = 'SvgButton';
