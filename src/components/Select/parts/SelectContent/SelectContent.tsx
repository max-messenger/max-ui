import { clsx } from 'clsx';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { useAppearanceClassNames } from '../../hooks';
import { type SelectDropdownWidth } from '../../types';
import styles from './SelectContent.module.scss';

export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
  dropdownWidth?: SelectDropdownWidth
  /** Закреплённая сверху часть (например, строка поиска) — не скроллится вместе со списком */
  header?: ReactNode
  innerClassNames?: { header?: string, body?: string }
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, forwardedRef) => {
  const {
    children,
    className,
    header,
    dropdownWidth = 'trigger',
    innerClassNames,
    ...rest
  } = props;

  const appearanceClassNames = useAppearanceClassNames();

  return (
    <div
      ref={forwardedRef}
      className={clsx(
        appearanceClassNames,
        styles.SelectContent,
        styles[`SelectContent_width_${dropdownWidth}`],
        className
      )}
      {...rest}
    >
      {header && (
        <div className={clsx(styles.SelectContent__header, innerClassNames?.header)}>
          {header}
        </div>
      )}

      <div className={clsx(styles.SelectContent__body, innerClassNames?.body)}>
        {children}
      </div>
    </div>
  );
});

SelectContent.displayName = 'SelectContent';
