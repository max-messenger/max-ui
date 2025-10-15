import { type ArgTypes } from '@storybook/react-vite';

export const disableArgs = (args: string[]): Partial<ArgTypes> => {
  return args.reduce<ArgTypes>((acc, val) => {
    acc[val] = { table: { disable: true } };
    return acc;
  }, {});
};

export const hideArgsControl = (args: string[]): Partial<ArgTypes> => {
  return args.reduce<ArgTypes>((acc, val) => {
    acc[val] = { control: false };
    return acc;
  }, {});
};
