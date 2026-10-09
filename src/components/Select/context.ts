import { createContext, type KeyboardEvent, type ReactNode, useContext } from 'react';

import { noop } from '../../helpers';
import { type InnerClassNamesProp } from '../../types';
import { DEFAULT_EMPTY_TEXT, EMPTY_OPTIONS } from './helpers';
import { type SelectElementKey, type SelectOption } from './types';

export interface SelectContextInterface {
  multiple: boolean
  query: string
  setQuery: (query: string) => void
  isSelected: (value: string) => boolean
  /**
   * single — выбрать и закрыть; multiple — переключить.
   * Опция запоминается, чтобы поле могло показать подпись выбранного значения.
   */
  select: (value: string, option?: SelectOption) => void
  close: () => void
  /** Опции после фильтрации (в режиме customDropdownMenu пусто) */
  options: SelectOption[]
  listId: string
  getOptionId: (index: number) => string
  /** Индекс подсвеченной опции (виртуальный фокус: реальный остаётся на поле или в поиске) */
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
  /** Клавиатурная навигация; вешается на поле и на строку поиска */
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
  emptyText: ReactNode
  loading: boolean
  /** Доступное имя для listbox */
  listLabel?: { 'aria-label'?: string, 'aria-labelledby'?: string }
  innerClassNames?: InnerClassNamesProp<SelectElementKey>
}

export const SelectContext = createContext<SelectContextInterface>({
  multiple: false,
  query: '',
  setQuery: noop,
  isSelected: () => false,
  select: noop,
  close: noop,
  options: EMPTY_OPTIONS,
  listId: '',
  getOptionId: () => '',
  activeIndex: null,
  setActiveIndex: noop,
  onKeyDown: noop,
  emptyText: DEFAULT_EMPTY_TEXT,
  loading: false
});

/** Доступ к состоянию Select из customDropdownMenu и внутренних частей */
export const useSelect = (): SelectContextInterface => useContext(SelectContext);
