import type { Meta, StoryObj } from '@storybook/react-vite';
import { selectControl } from '@storybook-config/shared';

import { Textarea, type TextareaProps } from './Textarea';

const meta = {
  title: 'Forms/Input/Textarea',
  component: Textarea,
  parameters: {
    cartesian: ['mode']
  },
  argTypes: {
    mode: selectControl(['primary', 'secondary'])
  },
  args: {
    mode: 'secondary',
    disabled: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<TextareaProps>;

export default meta;
type Story = StoryObj<TextareaProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Textarea
        {...args}
        defaultValue=""
        placeholder="Введите текст"
      />
    );
  }
};
