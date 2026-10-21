import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Checkbox, type CheckboxProps } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    cartesian: ['checked', 'indeterminate', 'disabled']
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Label',
    onChange: fn()
  }
} satisfies Meta<CheckboxProps>;

export default meta;
type Story = StoryObj<CheckboxProps>;

const render: Story['render'] = function Render (args) {
  const [, updateArgs] = useArgs<CheckboxProps>();

  return (
    <Checkbox
      {...args}
      onChange={(event) => {
        args.onChange?.(event);
        updateArgs({ checked: event.currentTarget.checked });
      }}
    />
  );
};

export const Playground: Story = { render };

export const WithCaption: Story = {
  args: {
    caption: 'Caption'
  },
  render
};
