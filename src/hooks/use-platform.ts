import { useAppearance } from '../components/MaxUI/MaxUIContext';
import { type PlatformType } from '../types';

export const usePlatform = (): PlatformType => {
  const { platform } = useAppearance();

  return platform;
};
