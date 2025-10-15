import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Counter, type CounterProps } from './Counter';

const meta = {
  title: 'Common/Counter',
  component: Counter,
  args: {
    appearance: 'themed',
    value: 1200,
    rounded: false,
    disabled: false,
    muted: false,
    mode: 'filled'
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
    appearance: 'themed',
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
