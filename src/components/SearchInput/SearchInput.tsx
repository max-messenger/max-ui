import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { usePlatform } from '../../hooks';
import { Icon16SearchOutline } from '../../icons';
import { type InnerClassNamesProp } from '../../types';
import { ClearableInput } from '../ClearableInput';
import styles from './SearchInput.module.scss';

export type SearchInputElementKey = 'input' | 'clearButton' | 'body';

export interface SearchInputProps extends ComponentProps<'input'> {
  innerClassNames?: InnerClassNamesProp<SearchInputElementKey>
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, forwardedRef) => {
  const {
    className,
    placeholder = 'Поиск',
    innerClassNames,
    ...rest
  } = props;

  const platform = usePlatform();

  const rootClassName = clsx(
    styles.SearchInput,
    styles[`SearchInput_platform_${platform}`],
    className
  );

  return (
    <label className={rootClassName}>
      <Icon16SearchOutline className={styles.SearchInput__icon} />

      <ClearableInput
        ref={forwardedRef}
        className={clsx(styles.SearchInput__body, innerClassNames?.body)}
        innerClassNames={{
          input: clsx(styles.SearchInput__input, innerClassNames?.input),
          clearButton: clsx(styles.SearchInput__clearButton, innerClassNames?.clearButton)
        }}
        type="text"
        placeholder={placeholder}
        {...rest}
      />
    </label>
  );
});

SearchInput.displayName = 'SearchInput';
