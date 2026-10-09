import type { Meta, StoryObj } from '@storybook/react-vite';
import {selectControl} from "@storybook-config/shared";

import { StatusBadge, type StatusBadgeProps } from './StatusBadge';

const meta = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  args: {
    text: 'Example',
    status: 'neutral'
  },
  argTypes: {
    status: selectControl(['positive', 'negative', 'warning', 'neutral']),
  }
} satisfies Meta<StatusBadgeProps>;

export default meta;
type Story = StoryObj<StatusBadgeProps>;

export const Playground: Story = {};
