import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, type AvatarTextProps } from '../../index';
import { AvatarText } from './AvatarText';

const meta = {
  title: 'Common/Avatar/Avatar.Text',
  component: AvatarText,
  args: {
    children: 'VT'
  }
} satisfies Meta<AvatarTextProps>;

export default meta;
type Story = StoryObj<AvatarTextProps>;

export const Playground: Story = {
  render: ({ ...props }) => {
    return (
      <Avatar.Container>
        <Avatar.Text {...props} />
      </Avatar.Container>
    );
  }
};
