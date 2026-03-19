export const getCssSizeValue = (value: number | string): string => {
  if (typeof value === 'string') return value;
  return `${value}px`;
};
