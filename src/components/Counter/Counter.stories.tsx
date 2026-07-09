import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, type ButtonVariant } from '../Button';
import { Counter, type CounterProps } from './Counter';

const meta = {
  title: 'Components/Counter',
  component: Counter,
  parameters: {
    cartesian: ['variant']
  },
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
    value: 32,
    variant: 'primary-contrast'
  },
  argTypes: {
    variant: {
      options: ['static', 'static-contrast', 'attention-contrast', 'primary-contrast'],
      control: { type: 'select' }
    }
  },
  render: ({ ...args }) => {
    return (
      <Button
        variant={getButtonCounterAppearance(args.variant)}
        indicator={<Counter {...args} />}
      >
        Messages
      </Button>
    );
  }
};

function getButtonCounterAppearance (counterVariant: CounterProps['variant']): ButtonVariant {
  switch (counterVariant) {
    case 'primary-contrast':
      return 'primary';
    case 'static':
      return 'secondary';
    case 'static-contrast':
      return 'overlay';
    case 'attention-contrast':
      return 'destructive';
    default:
      return 'primary';
  }
}
