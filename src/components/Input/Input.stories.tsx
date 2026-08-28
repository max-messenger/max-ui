import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon20Placeholder from '@storybook-config/assets/icons/icon-20-placeholder.svg';
import { hideArgsControl, selectControl } from '@storybook-config/shared';

import { Input, type InputProps } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  argTypes: {
    ...hideArgsControl(['innerClassNames']),
    mode: selectControl(['default', 'contrast']),
    size: selectControl(['medium', 'large']),
    count: {
      control: 'number',
      description: 'Shown only when the field has a value and is not disabled.'
    },
    hint: { control: 'text' },
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
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
    hint: 'Подсказка',
    defaultValue: 'Текст',
    placeholder: 'Введите текст'
  },
  decorators: [
    (Story, context) => (
      <div style={{ padding: 12, borderRadius: 12, background: context.args.mode === 'contrast' ? 'rgb(12 13 14 / 68%)' : undefined }}>
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
      <div style={{ minWidth: 350 }}>
        <Input
          {...args}
          iconBefore={Boolean(iconBefore) && <Icon20Placeholder />}
          iconAfter={Boolean(iconAfter) && <Icon20Placeholder />}
        />
      </div>
    );
  }
};
