import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea, type TextareaProps } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
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
        placeholder="Placeholder"
      />
    );
  }
};
