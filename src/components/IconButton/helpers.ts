import { type SpinnerAppearance } from '../Spinner';
import { type IconButtonAppearance, type IconButtonMode, type IconButtonSize } from './IconButton';

export const getIconButtonSpinnerSize = (iconButtonSize: IconButtonSize): number => {
  if (iconButtonSize === 'small') {
    return 20;
  }
  return 24;
};

export const getIconButtonSpinnerAppearance = (iconButtonAppearance: IconButtonAppearance, iconButtonMode: IconButtonMode): SpinnerAppearance => {
  if (iconButtonMode === 'primary') {
    if (iconButtonAppearance === 'themed') {
      return 'contrast-static';
    } else if (iconButtonAppearance === 'negative') {
      return 'contrast-static';
    } else if (iconButtonAppearance === 'neutral') {
      return 'contrast';
    } else if (iconButtonAppearance === 'neutral-themed') {
      return 'contrast-static';
    } else if (iconButtonAppearance === 'contrast-static') {
      return 'primary-static';
    }
  }

  if (iconButtonAppearance === 'themed') {
    return 'themed';
  } else if (iconButtonAppearance === 'negative') {
    return 'negative';
  } else if (iconButtonAppearance === 'neutral') {
    return 'primary';
  } else if (iconButtonAppearance === 'neutral-themed') {
    return 'neutral-themed';
  } else if (iconButtonAppearance === 'contrast-static') {
    return 'contrast-static';
  }

  return 'themed';
};
