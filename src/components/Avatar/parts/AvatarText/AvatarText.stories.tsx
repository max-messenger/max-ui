import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, type AvatarTextProps } from '../../index';
import { AvatarText } from './AvatarText';

const meta = {
  title: 'Components/Avatar/Avatar.Text',
  component: AvatarText,
  parameters: {
    cartesian: ['gradient']
  },
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
