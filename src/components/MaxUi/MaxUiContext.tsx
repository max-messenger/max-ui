import { createContext, useContext } from 'react';

import { type ColorSchemeType, type PlatformType } from '../../types';

export interface MaxUiContextInterface {
  platform: PlatformType
  colorScheme: ColorSchemeType
}

export const MaxUiContext = createContext<MaxUiContextInterface>({
  platform: 'ios',
  colorScheme: 'light'
});

export const useAppearance = (): MaxUiContextInterface => useContext(MaxUiContext);
