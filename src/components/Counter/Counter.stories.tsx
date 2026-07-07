import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Counter, type CounterProps } from './Counter';

const meta = {
  title: 'Components/Counter',
  component: Counter,
  args: {
    value: 12,
    rounded: false,
    variant: 'primary'
  }
} satisfies Meta<CounterProps>;

export default meta;
type Story = StoryObj<CounterProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return <Counter {...args} />;
  }
};

export const CounterInButton: Story = {
  name: 'Counter in Button',
  args: {
    value: 32
  },
  render: ({ ...args }) => {
    return (
      <Button
        indicator={<Counter {...args} />}
      >
        Messages
      </Button>
    );
  }
};
