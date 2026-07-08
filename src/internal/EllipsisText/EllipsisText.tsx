import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';

import { type AsChildProp } from '../../types';
import styles from './EllipsisText.module.scss';

export interface EllipsisTextProps extends ComponentProps<'div'>, AsChildProp {
  /**
   * Максимальное количество видимых строк
   *
   * FYI: при `maxLines > 1` используется свойство line-clamp, которое поддерживается не всеми версиями браузеров
   *
   * https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
   */
  maxLines?: number
}

export const EllipsisText = forwardRef<HTMLDivElement, EllipsisTextProps>((props, forwardedRef) => {
  const {
    className,
    maxLines = 1,
    style,
    asChild,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'span';

  const rootClassName = clsx(
    styles.EllipsisText,
    {
      [styles.EllipsisText_multiline]: maxLines > 1,
      [styles.EllipsisText_singleLine]: maxLines === 1
    },
    className
  );

  return (
    <Comp
      ref={forwardedRef}
      className={rootClassName}
      style={{
        '--MaxUi-EllipsisText_linesCount': maxLines,
        ...style
      } as CSSProperties}
      {...rest}
    />
  );
});

EllipsisText.displayName = 'EllipsisText';
