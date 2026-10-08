import { type UseInteractionsReturn } from '@floating-ui/react';
import { createContext, useContext } from 'react';

import { noop } from '../../helpers';
import { type InnerClassNamesProp } from '../../types';
import { type ContextMenuInnerElementKey, type ContextMenuResolvedMode } from './types';

export interface ContextMenuContextInterface {
  /** Разрешённый режим: 'desktop' — подменю сбоку, 'mobile' — аккордеон */
  mode: ContextMenuResolvedMode
  /** Закрыть всё меню целиком (вместе со всеми подменю) */
  close: () => void
  innerClassNames?: InnerClassNamesProp<ContextMenuInnerElementKey>
}

export const ContextMenuContext = createContext<ContextMenuContextInterface>({
  mode: 'desktop',
  close: noop
});

export const useContextMenu = (): ContextMenuContextInterface => useContext(ContextMenuContext);

/**
 * Контекст одного уровня меню — корневого или подменю.
 * Каждый уровень держит собственный useListNavigation и раздаёт строкам
 * пропсы для навигации стрелками и roving tabIndex.
 */
export interface ContextMenuLevelInterface {
  activeIndex: number | null
  getItemProps: UseInteractionsReturn['getItemProps']
}

const defaultLevelContext: ContextMenuLevelInterface = {
  activeIndex: null,
  getItemProps: (userProps) => ({ ...userProps })
};

export const ContextMenuLevelContext = createContext<ContextMenuLevelInterface>(defaultLevelContext);

export const useContextMenuLevel = (): ContextMenuLevelInterface => useContext(ContextMenuLevelContext);
