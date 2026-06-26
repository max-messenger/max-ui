import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Input, type InputProps } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  argTypes: {
    ...hideArgsControl(['innerClassNames']),
    count: { control: 'number' }
  },
  args: {
    disabled: false,
    size: 'large',
    withClearButton: true,
    count: 12
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<InputProps>;

export default meta;
type Story = StoryObj<InputProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Input
        {...args}
        defaultValue=""
        placeholder="Placeholder"
      />
    );
  }
};

export const InputContrast: Story = {
  render: ({ ...args }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', background: 'rgba(12 13 14 / 0.32)' }}>
        <Input {...args} defaultValue="" placeholder="Placeholder" />
      </div>
    );
  }
};
