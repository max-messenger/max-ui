import { useAppearance } from '../components/GuiduUI/GuiduUIContext';
import { type PlatformType } from '../types';

export const usePlatform = (): PlatformType => {
  const { platform } = useAppearance();

  return platform;
};
