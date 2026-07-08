import { type ComponentProps } from 'react';

export type SpinnerAppearance = 'primary' | 'themed' | 'neutral-themed' | 'primary-static' | 'contrast' | 'contrast-static' | 'negative';
export type SpinnerSize = 20 | 24 | number;

export interface SpinnerProps extends ComponentProps<'span'> {
  size?: SpinnerSize
  appearance?: SpinnerAppearance
}
export interface SpinnerPlatformProps {
  size?: SpinnerSize
}
