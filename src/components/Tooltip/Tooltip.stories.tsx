import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';

const meta = {
  component: Tooltip,
  tags: ['!autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "label": "label",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, porro?",
  },
};
