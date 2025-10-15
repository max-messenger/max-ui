import { type SpinnerAppearance } from '../Spinner';
import { type IconButtonAppearance, type IconButtonMode, type IconButtonSize } from './IconButton';

export const getIconButtonSpinnerSize = (iconButtonSize: IconButtonSize): number => {
  switch (iconButtonSize) {
    case 'small': return 20;
    default: return 24;
  }
};

export const getIconButtonSpinnerAppearance = (iconButtonAppearance: IconButtonAppearance, iconButtonMode: IconButtonMode): SpinnerAppearance => {
  if (iconButtonMode === 'primary') {
    switch (iconButtonAppearance) {
      case 'themed':
      case 'negative':
      case 'neutral-themed':
        return 'contrast-static';
      case 'neutral':
        return 'contrast';
      case 'contrast-static':
        return 'primary-static';
    }
  }

  switch (iconButtonAppearance) {
    case 'themed': return 'themed';
    case 'negative': return 'negative';
    case 'neutral': return 'primary';
    case 'neutral-themed': return 'neutral-themed';
    case 'contrast-static': return 'contrast-static';
  }
};
