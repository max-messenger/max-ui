import { clsx } from 'clsx';
import { Children, forwardRef, type HTMLAttributes, isValidElement, type ReactElement } from 'react';

import { usePlatform } from '../../hooks';
import type { SegmentedControlItemProps } from './components/SegmentedControlItem';
import styles from './SegmentedControl.module.scss';

export interface SegmentedControlProps extends HTMLAttributes<HTMLDivElement> {
  children: Array<ReactElement<SegmentedControlItemProps>>
}

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(({
  className,
  children,
  ...restProps
}, forwardedRef) => {
  const platform = usePlatform();

  const childrenArray = Children.toArray(children);
  const checkedIndex = childrenArray.findIndex((child) => isValidElement(child) && child.props.selected);
  const translateX = `translateX(${100 * checkedIndex}%)`;

  return (
    <div
      ref={forwardedRef}
      role="tablist"
      className={clsx(
        styles.SegmentedControl,
        platform === 'ios' && styles.SegmentedControl_platform_ios,
        className
      )}
      {...restProps}
    >
      <div className={styles.SegmentedControl__body}>
        {checkedIndex > -1 && (
          <div
            aria-hidden
            className={styles.SegmentedControl__slider}
            style={{
              width: `${100 / childrenArray.length}%`,
              transform: translateX
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
});

SegmentedControl.displayName = 'SegmentedControl';
