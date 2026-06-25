import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

import { Counter, type CounterProps } from '../Counter';
import { type SpinnerAppearance } from '../Spinner';
import { type ButtonSize, type ButtonVariant } from './Button';

export const getButtonSpinnerSize = (buttonSize: ButtonSize): number => {
  switch (buttonSize) {
    case 'xsmall': return 16;
    case 'small': return 20;
    default: return 24;
  }
};

export const getButtonSpinnerAppearance = (buttonVariant: ButtonVariant): SpinnerAppearance => {
  switch (buttonVariant) {
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

export const getButtonCounterAppearance = (buttonVariant: ButtonVariant): Pick<CounterProps, 'appearance' | 'mode'> => {
  switch (buttonVariant) {
    case 'primary':
      return { mode: 'inverse', appearance: 'themed' };
    case 'secondary':
      return { mode: 'filled', appearance: 'themed' };
    case 'ghost':
      return { mode: 'filled', appearance: 'themed' };
    case 'primary-contrast':
      return { mode: 'filled', appearance: 'neutral-static' };
    case 'secondary-contrast':
      return { mode: 'filled', appearance: 'neutral-static' };
    case 'overlay':
      return { mode: 'filled', appearance: 'neutral-static' };
    case 'destructive':
      return { mode: 'inverse', appearance: 'negative' };
  }
};

export const injectButtonIndicator = (indicatorNode: ReactNode, buttonVariant: ButtonVariant, disabled?: boolean): ReactNode => {
  if (!isValidElement(indicatorNode)) {
    return indicatorNode;
  }

  if (indicatorNode.type === Counter) {
    return cloneElement(
      indicatorNode as ReactElement<CounterProps>,
      {
        ...getButtonCounterAppearance(buttonVariant),
        disabled
      }
    );
  }

  return indicatorNode;
};
