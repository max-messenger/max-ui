import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import {
  type AllHTMLAttributes, type ElementType,
  forwardRef,
  type ReactNode
} from 'react';

import { useButtonLikeProps, usePlatform } from '../../hooks';
import { type AsChildProp, type MergeProps } from '../../types';
import { Ripple } from '../Ripple';
import { checkComponentHasAction } from './helpers';
import styles from './Tappable.module.scss';

type TappableOwnProps = {
  as?: ElementType
  parentChildren?: ReactNode
} & AsChildProp;

export type TappableProps = MergeProps<AllHTMLAttributes<HTMLElement>, TappableOwnProps>;

export const Tappable = forwardRef<HTMLElement, TappableProps>((props, forwardedRef) => {
  const {
    className,
    disabled,
    asChild,
    children,
    parentChildren,
    as = 'div',
    ...rest
  } = props;

  const Comp = asChild ? Slot : as;

  const platform = usePlatform();
  const buttonLikeProps = useButtonLikeProps({ asChild, children, disabled, rootElement: as });
  const hasAction = checkComponentHasAction(props);
  const withRipple = platform === 'android' && hasAction && !disabled;

  const rootClassName = clsx(
    styles.Tappable,
    {
      [styles.Tappable_interactive]: hasAction,
      [styles.Tappable_disabled]: disabled,
      [styles.Tappable_activeMode_highlight]: !withRipple,
      [styles.Tappable_activeMode_ripple]: withRipple
    },
    className
  );

  return (
    <Comp
      ref={forwardedRef}
      className={rootClassName}
      {...(hasAction ? buttonLikeProps : {})}
      {...rest}
    >
      {children}

      {withRipple && <Ripple className={styles.Tappable__ripple} />}
    </Comp>
  );
});

Tappable.displayName = 'Tappable';
