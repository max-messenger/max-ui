interface GetCssSizeValueProps {
  value: number | string
};

export const getCssSizeValue = (props: GetCssSizeValueProps): string => {
  const { value } = props;
  if (typeof value === 'string') return value;
  return `${value}px`;
};
