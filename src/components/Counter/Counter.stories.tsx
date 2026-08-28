import type { Meta, StoryObj } from '@storybook/react-vite';
import { selectControl } from '@storybook-config/shared';

import { Button, type ButtonVariant } from '../Button';
import { Counter, type CounterProps } from './Counter';

const meta = {
  title: 'Components/Counter',
  component: Counter,
  parameters: {
    cartesian: ['variant']
  },
  argTypes: {
    variant: selectControl(['primary', 'primary-contrast', 'attention', 'attention-contrast', 'promo', 'static', 'static-contrast', 'default', 'mute', 'menu']),
    value: {
      control: 'number',
      description: 'When rounded is true, large values use compact notation, for example 1200 → 1.2K.'
    },
    rounded: {
      control: 'boolean',
      description: 'Enables compact number formatting. Small values are unchanged.'
    }
  },
  args: {
    value: 1200,
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
    variant: selectControl(['static', 'static-contrast', 'attention-contrast', 'primary-contrast'])
  },
  render: ({ ...args }) => {
    return (
      <Button
        variant={getButtonCounterAppearance(args.variant)}
        indicator={<Counter {...args} />}
      >
        Сообщения
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
