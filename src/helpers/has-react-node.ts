import { type ReactNode } from 'react';

export const hasReactNode = (value: ReactNode): boolean => {
  return value !== undefined && value !== false && value !== null && value !== '';
};
