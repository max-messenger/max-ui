import { useEffect, useState } from 'react';

import { type ContextMenuMode, type ContextMenuOpenOn, type ContextMenuResolvedMode } from './types';

/** Задержка открытия вложенного меню при наведении на пункт (desktop) */
export const SUBMENU_OPEN_DELAY = 100;
/** Задержка закрытия вложенного меню — чтобы курсор успел переехать со строки на панель */
export const SUBMENU_CLOSE_DELAY = 300;
/** Задержки открытия/закрытия корневого меню при наведении на триггер */
export const TRIGGER_HOVER_DELAY = { open: 100, close: 300 };
/** Отступ между триггером и корневым меню */
export const MENU_OFFSET = 4;
/** Отступ между строкой-родителем и вложенной панелью; с учётом inset строки 8px визуальный зазор между панелями — 8px */
export const SUBMENU_OFFSET = 16;
/** Отступ от краёв экрана при flip/shift — меню должно целиком помещаться на экране */
export const COLLISION_PADDING = 8;

export const normalizeOpenOn = (openOn: ContextMenuOpenOn | ContextMenuOpenOn[]): ContextMenuOpenOn[] => {
  return Array.isArray(openOn) ? openOn : [openOn];
};

const getIsCoarsePointer = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;

  return window.matchMedia('(pointer: coarse)').matches;
};

/** Разрешает mode='auto' в 'mobile' для сенсорного указателя и 'desktop' иначе, с подпиской на изменения */
export const useResolvedMode = (mode: ContextMenuMode): ContextMenuResolvedMode => {
  const [isCoarsePointer, setIsCoarsePointer] = useState(getIsCoarsePointer);

  useEffect(() => {
    if (mode !== 'auto' || typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const handleChange = (event: MediaQueryListEvent) => {
      setIsCoarsePointer(event.matches);
    };

    setIsCoarsePointer(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [mode]);

  if (mode !== 'auto') return mode;

  return isCoarsePointer ? 'mobile' : 'desktop';
};
