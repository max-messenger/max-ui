import type { Meta, StoryObj } from '@storybook/react-vite';
import { selectControl } from '@storybook-config/shared';

import { Spinner } from './Spinner';
import { type SpinnerProps } from './types';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    cartesian: ['appearance']
  },
  argTypes: {
    appearance: selectControl(['primary', 'themed', 'neutral-themed', 'primary-static', 'contrast', 'contrast-static', 'negative']),
    size: selectControl([20, 24, 40])
  },
  args: {
    appearance: 'primary',
    size: 20
  },
  decorators: [
    (Story, context) => (
      <div
        style={{
          padding: 12,
          borderRadius: 12,
          background: String(context.args.appearance).includes('contrast') ? 'rgb(12 13 14 / 68%)' : undefined
        }}
      >
        <Story />
      </div>
    )
  ]
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
