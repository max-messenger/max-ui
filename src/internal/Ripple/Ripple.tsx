import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useEffect, useRef } from 'react';

import { mergeRefs } from '../../helpers';
import styles from './Ripple.module.scss';

export interface RippleProps extends ComponentProps<'span'> {}

export const Ripple = forwardRef<HTMLSpanElement, RippleProps>((props, forwardedRef) => {
  const {
    className,
    ...rest
  } = props;

  const parentRef = useRef<HTMLElement | null>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  const showRipple = (x: number, y: number): void => {
    if (rippleRef.current === null) return;

    rippleRef.current.classList.remove(styles.Ripple_active);
    rippleRef.current.style.top = y + 'px';
    rippleRef.current.style.left = x + 'px';
    rippleRef.current.classList.add(styles.Ripple_active);
  };

  const hideRipple = (): void => {
    if (rippleRef.current === null) return;

    rippleRef.current.classList.remove(styles.Ripple_active);
  };

  const onPointerDown = (e: PointerEvent): void => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - (rect.left ?? 0);
    const y = e.clientY - (rect.top ?? 0);

    showRipple(x, y);
  };

  const bindEvents = (): void => {
    if (parentRef.current === null) return;

    parentRef.current.addEventListener('pointerdown', onPointerDown);
  };

  const unbindEvents = (): void => {
    if (parentRef.current === null) return;

    parentRef.current?.removeEventListener('pointerdown', onPointerDown);
  };

  useEffect(() => {
    if (!rippleRef.current) return;
    parentRef.current = rippleRef.current.parentElement;

    bindEvents();

    return () => {
      unbindEvents();
    };
  }, []);

  return (
    <span
      ref={mergeRefs(forwardedRef, rippleRef)}
      role="presentation"
      aria-hidden
      className={clsx(styles.Ripple, className)}
      onAnimationEnd={hideRipple}
      {...rest} // todo мержить пропсы во всех компонентах, чтобы не было конфликтов. сейчас можно затереть onAnimationEnd
    />
  );
});

Ripple.displayName = 'Ripple';
