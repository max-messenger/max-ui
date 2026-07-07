import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner, type SpinnerProps } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
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
