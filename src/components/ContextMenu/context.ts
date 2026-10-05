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
