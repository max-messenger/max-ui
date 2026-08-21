import { useAppearance } from '../components/MaxUI/MaxUIContext';
import { type ColorSchemeType } from '../types';

export const useColorScheme = (): ColorSchemeType => {
  const { colorScheme } = useAppearance();

  return colorScheme;
};
