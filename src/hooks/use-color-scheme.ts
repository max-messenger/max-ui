import { useAppearance } from '../components/GuiduUI/GuiduUIContext';
import { type ColorSchemeType } from '../types';

export const useColorScheme = (): ColorSchemeType => {
  const { colorScheme } = useAppearance();

  return colorScheme;
};
