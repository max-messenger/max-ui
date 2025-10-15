import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon20Placeholder from '../../../.storybook/assets/icons/icon-20-placeholder.svg';
import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Input, type InputProps } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  argTypes: {
    ...hideArgsControl(['innerClassNames']),

    iconBefore: { control: 'boolean' },
    iconAfter: { control: 'boolean' }
  },
  args: {
    mode: 'secondary',
    iconAfter: false,
    iconBefore: true,
    disabled: false,
    compact: false,
    withClearButton: true
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
  render: ({ iconBefore, iconAfter, ...args }) => {
    return (
      <Input
        {...args}
        iconBefore={Boolean(iconBefore) && <Icon20Placeholder />}
        iconAfter={Boolean(iconAfter) && <Icon20Placeholder />}
        defaultValue=""
        placeholder="Placeholder"
      />
    );
  }
};
