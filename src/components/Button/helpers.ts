import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

import { Counter, type CounterProps } from '../Counter';
import { type SpinnerAppearance } from '../Spinner';
import { type ButtonSize, type ButtonVariant } from './Button';

export const getButtonSpinnerSize = (buttonSize: ButtonSize): number => {
  switch (buttonSize) {
    case 'xsmall': return 16;
    case 'small':
    case 'medium': return 20;
    case 'large': return 24;
  }
};

export const getButtonSpinnerAppearance = (buttonVariant: ButtonVariant): SpinnerAppearance => {
  switch (buttonVariant) {
    case 'primary':
    case 'destructive':
    case 'overlay':
      return 'contrast-static';
    case 'secondary':
      return 'primary';
    case 'ghost':
      return 'themed';
    case 'primary-contrast':
    case 'secondary-contrast':
      return 'primary-static';
  }
};

export const getButtonCounterAppearance = (buttonVariant: ButtonVariant): Pick<CounterProps, 'variant'> => {
  switch (buttonVariant) {
    case 'primary':
      return { variant: 'primary-contrast' };
    case 'secondary':
      return { variant: 'static' };
    case 'ghost':
      return { variant: 'static' };
    case 'primary-contrast':
      return { variant: 'static' };
    case 'secondary-contrast':
      return { variant: 'static' };
    case 'overlay':
      return { variant: 'static-contrast' };
    case 'destructive':
      return { variant: 'attention-contrast' };
  }
};

export const injectButtonIndicator = (indicatorNode: ReactNode, buttonVariant: ButtonVariant): ReactNode => {
  if (!isValidElement(indicatorNode)) {
    return indicatorNode;
  }

  if (indicatorNode.type === Counter) {
    return cloneElement(
      indicatorNode as ReactElement<CounterProps>,
      {
        ...getButtonCounterAppearance(buttonVariant)
      }
    );
  }

  return indicatorNode;
};
