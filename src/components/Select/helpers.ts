import { type SelectOption, type SelectValue } from './types';

/** Отступ между полем и панелью */
export const DROPDOWN_OFFSET = 4;
/** Отступ от краёв экрана при flip/shift/size */
export const COLLISION_PADDING = 8;
export const DEFAULT_EMPTY_TEXT = 'Ничего не найдено';
export const DEFAULT_SEARCH_PLACEHOLDER = 'Поиск';

export const EMPTY_OPTIONS: SelectOption[] = [];

/** Пустая строка в single — «ничего не выбрано» */
export const toValuesArray = (value: SelectValue | undefined): string[] => {
  if (value === undefined || value === '') return [];

  return Array.isArray(value) ? value : [value];
};

const getTextPart = (node: SelectOption['label']): string => {
  return typeof node === 'string' || typeof node === 'number' ? String(node) : '';
};

export const getOptionSearchText = (option: SelectOption): string => {
  if (option.searchText !== undefined) return option.searchText;

  return `${getTextPart(option.label)} ${getTextPart(option.hint)}`.trim() || option.value;
};

export const defaultFilterOption = (option: SelectOption, query: string): boolean => {
  return getOptionSearchText(option).toLowerCase().includes(query.trim().toLowerCase());
};

/** Индекс ближайшей неотключённой опции от `from` (не включая) в направлении `step`; -1, если таких нет */
export const findEnabledIndex = (options: SelectOption[], from: number, step: 1 | -1): number => {
  for (let index = from + step; index >= 0 && index < options.length; index += step) {
    if (!options[index].disabled) return index;
  }

  return -1;
};
