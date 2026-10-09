import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, forwardRef, useEffect, useRef } from 'react';

import { mergeRefs } from '../../../../helpers';
import { Icon16CloseIos, Icon16SearchOutline } from '../../../../icons';
import { SvgButton } from '../../../../internal';
import { useSelect } from '../../context';
import styles from './SelectSearch.module.scss';

export type SelectSearchProps = Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange' | 'type'>;

/** Строка поиска внутри панели */
export const SelectSearch = forwardRef<HTMLInputElement, SelectSearchProps>((props, forwardedRef) => {
  const { className, placeholder, ...rest } = props;

  const {
    query,
    setQuery,
    listId,
    activeIndex,
    getOptionId,
    onKeyDown,
    innerClassNames
  } = useSelect();

  const inputRef = useRef<HTMLInputElement>(null);

  // При открытии панели фокус уходит в поиск; на тач-устройствах не фокусируем, чтобы не поднимать клавиатуру
  useEffect(() => {
    if (window.matchMedia?.('(pointer: coarse)').matches) return;

    inputRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className={clsx(styles.SelectSearch, className, innerClassNames?.search)}>
      <Icon16SearchOutline className={styles.SelectSearch__icon} />

      <input
        ref={mergeRefs<HTMLInputElement>(inputRef, forwardedRef)}
        type="text"
        role="searchbox"
        autoComplete="off"
        spellCheck={false}
        aria-autocomplete="list"
        aria-label={placeholder}
        aria-controls={listId}
        aria-activedescendant={activeIndex === null ? undefined : getOptionId(activeIndex)}
        className={styles.SelectSearch__input}
        placeholder={placeholder}
        value={query}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
        onKeyDown={onKeyDown}
        {...rest}
      />

      {query !== '' && (
        <SvgButton
          type="button"
          tabIndex={-1}
          className={styles.SelectSearch__clearButton}
          aria-label="Очистить поиск"
          onMouseDown={(event) => {
            event.preventDefault();
          }}
          onClick={() => {
            setQuery('');
          }}
        >
          <Icon16CloseIos />
        </SvgButton>
      )}
    </div>
  );
});

SelectSearch.displayName = 'SelectSearch';
