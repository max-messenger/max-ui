import { createContext, useContext } from 'react';

import { type ColorSchemeType, type PlatformType } from '../../types';

export interface GuiduUIContextInterface {
  platform: PlatformType
  colorScheme: ColorSchemeType
}

export const GuiduUIContext = createContext<GuiduUIContextInterface>({
  platform: 'ios',
  colorScheme: 'light'
});

export const useAppearance = (): GuiduUIContextInterface => useContext(GuiduUIContext);
