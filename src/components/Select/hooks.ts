import { clsx } from 'clsx';
import { type KeyboardEvent, useCallback } from 'react';

import maxUiStyles from '../MaxUI/MaxUI.module.scss';
import { useAppearance } from '../MaxUI/MaxUIContext';
import { findEnabledIndex } from './helpers';
import { type SelectOption } from './types';

export const useAppearanceClassNames = (): string => {
  const { platform, colorScheme } = useAppearance();

  return clsx(
    maxUiStyles[`MaxUI_colorScheme_${colorScheme}`],
    maxUiStyles[`MaxUI_platform_${platform}`]
  );
};

interface UseSelectNavigationParams {
  open: boolean
  options: SelectOption[]
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
  onSelectIndex: (index: number) => void
  onOpen: () => void
  /** restoreFocus — вернуть фокус на поле после закрытия */
  onClose: (restoreFocus: boolean) => void
  /** Очистка значения по Backspace/Delete на закрытом поле */
  onClear?: () => void
}

export const useSelectNavigation = (params: UseSelectNavigationParams) => {
  const { open, options, activeIndex, setActiveIndex, onSelectIndex, onOpen, onClose, onClear } = params;

  return useCallback((event: KeyboardEvent<HTMLElement>) => {
    // События вложенных элементов (например, кнопки очистки) не обрабатываем
    if (event.target !== event.currentTarget) return;
    if (event.nativeEvent.isComposing) return;

    const isTextInput = event.currentTarget instanceof HTMLInputElement;

    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen();
        return;
      }

      if ((event.key === 'Backspace' || event.key === 'Delete') && onClear) {
        event.preventDefault();
        onClear();
      }

      return;
    }

    const setIndex = (index: number) => {
      if (index !== -1) setActiveIndex(index);
    };

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setIndex(findEnabledIndex(options, activeIndex ?? -1, 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setIndex(findEnabledIndex(options, activeIndex ?? options.length, -1));
        break;
      case 'Home':
        // В строке поиска Home/End двигают каретку
        if (isTextInput) break;
        event.preventDefault();
        setIndex(findEnabledIndex(options, -1, 1));
        break;
      case 'End':
        if (isTextInput) break;
        event.preventDefault();
        setIndex(findEnabledIndex(options, options.length, -1));
        break;
      case 'Enter':
      case ' ': {
        // Пробел в строке поиска — это ввод текста
        if (event.key === ' ' && isTextInput) break;

        const activeOption = activeIndex === null ? undefined : options[activeIndex];

        if (activeIndex !== null && activeOption && !activeOption.disabled) {
          event.preventDefault();
          onSelectIndex(activeIndex);
        } else if (!isTextInput) {
          // На поле без подсвеченной строки Enter/Space закрывают открытую панель
          event.preventDefault();
          onClose(true);
        }
        break;
      }
      case 'Tab':
        if (isTextInput) event.preventDefault();
        onClose(isTextInput);
        break;
    }
  }, [open, options, activeIndex, setActiveIndex, onSelectIndex, onOpen, onClose, onClear]);
};
