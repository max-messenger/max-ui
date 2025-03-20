import { useAppearance } from '../components';
import { type ColorSchemeType } from '../types';

export const useColorScheme = (): ColorSchemeType => {
  const { colorScheme } = useAppearance();

  return colorScheme;
};
