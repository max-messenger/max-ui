import { type ReactNode } from 'react';

export type SnackbarPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type SnackbarOffset = number | string;

export interface SnackbarParams {
  /** Идентификатор снэкбара */
  id?: string;
  /** Основной текст */
  text: ReactNode;
  /** Дополнительный мелкий текст */
  caption?: ReactNode;
  /** React-узел перед текстом (иконка, элемент) */
  before?: ReactNode;
  /** React-узел после текста (кнопка, иконка действия) */
  after?: ReactNode;
  /** Время показа в мс. По умолчанию 5000 */
  duration?: number;
  /** Позиция. По умолчанию берётся из SnackbarProvider (`bottom-center`) */
  placement?: SnackbarPlacement;
  /**
   * Отступ от верхнего или нижнего края в зависимости от placement.
   * Число трактуется как px, строка — как CSS-значение.
   * Safe area добавляется отдельно.
   */
  offset?: SnackbarOffset;
}

export type SnackbarQueueItem = Omit<SnackbarParams, 'id' | 'placement'> & {
  id: string;
  placement: SnackbarPlacement;
  /** Внутренний флаг: элемент уходит — проигрываем анимацию выхода перед удалением */
  leaving?: boolean;
};

export type ShowSnackbarCallback = (params: SnackbarParams) => void;
export type CloseSnackbarCallback = (id: string) => void;

export interface SnackbarContextValue {
  showSnackbar: ShowSnackbarCallback;
  closeSnackbar: CloseSnackbarCallback;
}
