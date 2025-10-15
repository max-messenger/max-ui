import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

import { Counter, type CounterProps } from '../Counter';
import { type SpinnerAppearance } from '../Spinner';
import { type ButtonAppearance, type ButtonMode, type ButtonSize } from './Button';

export const getButtonSpinnerSize = (buttonSize: ButtonSize): number => {
  switch (buttonSize) {
    case 'small': return 20;
    default: return 24;
  }
};

export const getButtonSpinnerAppearance = (buttonAppearance: ButtonAppearance, buttonMode: ButtonMode): SpinnerAppearance => {
  if (buttonMode === 'primary') {
    switch (buttonAppearance) {
      case 'themed':
      case 'negative':
      case 'neutral-themed':
        return 'contrast-static';
      case 'contrast-static': return 'primary-static';
      case 'neutral': return 'contrast';
    }
  }

  switch (buttonAppearance) {
    case 'themed': return 'themed';
    case 'negative': return 'negative';
    case 'neutral': return 'primary';
    case 'neutral-themed': return 'neutral-themed';
    case 'contrast-static': return 'contrast-static';
  }
};

export const getButtonCounterAppearance = (buttonAppearance: ButtonAppearance, buttonMode: ButtonMode): Pick<CounterProps, 'appearance' | 'mode'> => {
  if (buttonAppearance === 'negative') {
    return { mode: buttonMode === 'primary' ? 'inverse' : 'filled', appearance: 'negative' };
  } else if (buttonAppearance === 'neutral') {
    return { mode: buttonMode === 'primary' ? 'inverse' : 'filled', appearance: 'neutral' };
  } else if (buttonAppearance === 'neutral-themed') {
    return { mode: buttonMode === 'primary' ? 'inverse' : 'filled', appearance: 'neutral-themed' };
  } else if (buttonAppearance === 'contrast-static') {
    return { mode: buttonMode === 'primary' ? 'filled' : 'inverse', appearance: 'neutral-static' };
  }

  return { mode: buttonMode === 'primary' ? 'inverse' : 'filled', appearance: 'themed' };
};

export const injectButtonIndicator = (indicatorNode: ReactNode, buttonAppearance: ButtonAppearance, buttonMode: ButtonMode, disabled?: boolean): ReactNode => {
  if (!isValidElement(indicatorNode)) {
    return indicatorNode;
  }

  if (indicatorNode.type === Counter) {
    return cloneElement(
      indicatorNode as ReactElement<CounterProps>,
      {
        ...getButtonCounterAppearance(buttonAppearance, buttonMode),
        disabled
      }
    );
  }

  return indicatorNode;
};
