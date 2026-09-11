import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Radio, type RadioProps } from './Radio';

const meta = {
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    cartesian: ['checked', 'disabled']
  },
  args: {
    checked: false,
    disabled: false,
    onChange: fn(),
    'aria-label': 'Радиокнопка'
  }
} satisfies Meta<RadioProps>;

export default meta;
type Story = StoryObj<RadioProps>;

export const Playground: Story = {
  render: function Render (args) {
    const [, updateArgs] = useArgs<RadioProps>();

    return (
      <Radio
        {...args}
        onChange={(event) => {
          args.onChange?.(event);
          updateArgs({ checked: event.currentTarget.checked });
        }}
      />
    );
  }
};
