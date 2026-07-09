import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './Spinner';
import { type SpinnerProps } from './types';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    cartesian: ['appearance']
  },
  args: {
    appearance: 'primary',
    size: 20
  }
} satisfies Meta<SpinnerProps>;

export default meta;
type Story = StoryObj<SpinnerProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Spinner {...args} />
    );
  }
};
