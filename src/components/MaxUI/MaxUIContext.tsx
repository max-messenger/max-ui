import { createContext, useContext } from 'react';

import { type ColorSchemeType, type PlatformType } from '../../types';

export interface MaxUIContextInterface {
  platform: PlatformType
  colorScheme: ColorSchemeType
}

export const MaxUIContext = createContext<MaxUIContextInterface>({
  platform: 'ios',
  colorScheme: 'light'
});

export const useAppearance = (): MaxUIContextInterface => useContext(MaxUIContext);
