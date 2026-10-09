import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { Spinner } from '../../../Spinner';
import { useSelect } from '../../context';
import styles from './SelectEmpty.module.scss';

export type SelectEmptyProps = Omit<ComponentPropsWithoutRef<'div'>, 'role'>;

export const SelectEmpty = forwardRef<HTMLDivElement, SelectEmptyProps>((props, forwardedRef) => {
  const { className, children, ...rest } = props;

  const { emptyText, loading, innerClassNames } = useSelect();

  return (
    <div
      ref={forwardedRef}
      role="status"
      aria-label={loading ? 'Загрузка' : undefined}
      className={clsx(
        styles.SelectEmpty,
        loading ? innerClassNames?.loading : innerClassNames?.empty,
        className
      )}
      {...rest}
    >
      {loading ? <Spinner size={20} aria-hidden /> : (children ?? emptyText)}
    </div>
  );
});

SelectEmpty.displayName = 'SelectEmpty';
