import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon20Placeholder from '../../../.storybook/assets/icons/icon-20-placeholder.svg';
import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Input, type InputProps } from './Input';

const styles = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

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
    (Story, context) => (
      <div style={{ ...styles, background: context.args.mode === 'contrast' ? 'rgba(12 13 14 / 0.32)' : 'none' }}>
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
          defaultValue=""
          placeholder="Placeholder"
        />
      </div>
    );
  }
};
