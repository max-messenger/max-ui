import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon20Placeholder from '../../../.storybook/assets/icons/icon-20-placeholder.svg';
import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Input, type InputProps } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  argTypes: {
    ...hideArgsControl(['innerClassNames']),
    count: { control: 'number' },
    iconBefore: { control: 'boolean' },
    iconAfter: { control: 'boolean' }
  },
  args: {
    iconAfter: false,
    iconBefore: true,
    disabled: false,
    size: 'large',
    withClearButton: true,
    count: 12,
    mode: 'default',
    hint: 'Подсказка к полю'
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

export const InputContrast: Story = {
  argTypes: {
    mode: { control: false }
  },
  render: ({ iconBefore, iconAfter, ...args }) => {
    return (
      <div style={{ height: '300px', background: 'rgba(12 13 14 / 0.32)', padding: 25 }}>
        <Input
          {...args}
          iconBefore={Boolean(iconBefore) && <Icon20Placeholder />}
          iconAfter={Boolean(iconAfter) && <Icon20Placeholder />}
          defaultValue=""
          placeholder="Placeholder"
          mode='contrast'
        />
      </div>
    );
  }
};
