import { type SpinnerAppearance } from '../Spinner';
import { type IconButtonSize, type IconButtonVariant } from './IconButton';

export const getIconButtonSpinnerSize = (iconButtonSize: IconButtonSize): number => {
  switch (iconButtonSize) {
    case 'xsmall': return 16;
    case 'small':
    case 'medium': return 20;
    case 'large': return 24;
  }
};

export const getIconButtonSpinnerAppearance = (iconButtonVariant: IconButtonVariant): SpinnerAppearance => {
  switch (iconButtonVariant) {
    case 'primary':
    case 'destructive':
    case 'overlay':
      return 'contrast-static';
    case 'secondary':
    case 'ghost':
      return 'primary';
    case 'primary-contrast':
    case 'secondary-contrast':
      return 'primary-static';
  }
};
