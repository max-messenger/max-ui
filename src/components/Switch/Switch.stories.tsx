import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Switch, type SwitchProps } from './Switch';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    cartesian: ['checked', 'disabled']
  },
  args: {
    checked: false,
    disabled: false,
    onChange: fn(),
    'aria-label': 'Переключатель'
  }
} satisfies Meta<SwitchProps>;

export default meta;
type Story = StoryObj<SwitchProps>;

export const Playground: Story = {
  render: function Render (args) {
    const [, updateArgs] = useArgs<SwitchProps>();

    return (
      <Switch
        {...args}
        onChange={(event) => {
          args.onChange?.(event);
          updateArgs({ checked: event.currentTarget.checked });
        }}
      />
    );
  }
};
