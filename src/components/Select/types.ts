import { type Placement } from '@floating-ui/react';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { type InnerClassNamesProp } from '../../types';

export type SelectMode = 'default' | 'contrast';

export type SelectSize = 'large' | 'medium';

/** 'trigger' — ширина панели равна ширине поля; 'auto' — по содержимому (минимум — ширина поля) */
export type SelectDropdownWidth = 'trigger' | 'auto';

export type SelectValue = string | string[];

export type SelectElementKey =
  | 'container'
  | 'field'
  | 'iconBefore'
  | 'value'
  | 'counter'
  | 'chevron'
  | 'clearButton'
  | 'hint'
  | 'content'
  | 'search'
  | 'list'
  | 'loading'
  | 'empty'
  | 'option'
  | 'optionBefore'
  | 'optionLabel'
  | 'optionHint'
  | 'optionCheck';

export interface SelectOption {
  value: string
  label: ReactNode
  before?: ReactNode
  /** Вспомогательный текст справа */
  hint?: ReactNode
  searchText?: string
  disabled?: boolean
}

export interface SelectDropdownApi {
  /** Текущий поисковый запрос (из SelectSearch) */
  query: string
  multiple: boolean
  isSelected: (value: string) => boolean
  /** single — выбрать и закрыть; multiple — переключить */
  select: (value: string, option?: SelectOption) => void
  close: () => void
}

export interface SelectBaseProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'defaultValue' | 'onChange' | 'placeholder' | 'role'> {
  /** Опции выпадающего списка. Для кастомного содержимого используйте customDropdownMenu */
  options?: SelectOption[]
  /**
   * Своё содержимое выпадающей панели вместо списка опций.
   */
  customDropdownMenu?: ReactNode | ((api: SelectDropdownApi) => ReactNode)
  /**
   * Опции, уже выбранные в controlled-значении
   */
  selectedOptions?: SelectOption[]

  /** Строка поиска в панели (только для режима options) */
  searchable?: boolean
  searchPlaceholder?: string
  /**
   * Своя фильтрация
   */
  filterOption?: (option: SelectOption, query: string) => boolean
  /** Вызывается при вводе в поиск и при закрытии панели */
  onSearchChange?: (query: string) => void
  loading?: boolean
  /* Текст пустого состояния */
  emptyText?: ReactNode

  placeholder?: ReactNode
  disabled?: boolean
  mode?: SelectMode
  size?: SelectSize
  hint?: ReactNode
  iconBefore?: ReactNode
  withClearButton?: boolean
  /** Имя для нативной отправки формы: рендерятся скрытые input по одному на значение */
  name?: string

  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  dropdownWidth?: SelectDropdownWidth

  innerClassNames?: InnerClassNamesProp<SelectElementKey>
}

export interface SelectSingleProps extends SelectBaseProps {
  multiple?: false
  value?: string
  defaultValue?: string
  onValueChange?: (value: string, option: SelectOption | null) => void
}

export interface SelectMultipleProps extends SelectBaseProps {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[], options: SelectOption[]) => void
}

export type SelectProps = SelectSingleProps | SelectMultipleProps;
