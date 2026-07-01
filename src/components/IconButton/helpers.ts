import { type SpinnerAppearance } from '../Spinner';
import { type IconButtonSize, type IconButtonVariant } from './IconButton';

export const getIconButtonSpinnerSize = (iconButtonSize: IconButtonSize): number => {
  switch (iconButtonSize) {
    case 'xsmall': return 16;
    case 'small': return 20;
    default: return 24;
  }
};

export const getIconButtonSpinnerAppearance = (iconButtonVariant: IconButtonVariant): SpinnerAppearance => {
  switch (iconButtonVariant) {
    case 'primary':
    case 'destructive':
      return 'contrast-static';
    case 'secondary':
    case 'ghost':
      return 'themed';
    case 'primary-contrast':
      return 'primary-static';
    case 'secondary-contrast':
    case 'overlay':
      return 'contrast-static';
  }
};
