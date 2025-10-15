import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, type AvatarImageProps } from '../../index';
import { AvatarImage } from './AvatarImage';

const meta = {
  title: 'Common/Avatar/Avatar.Image',
  component: AvatarImage,
  args: {
    src: 'https://sun9-21.userapi.com/1N-rJz6-7hoTDW7MhpWe19e_R_TdGV6Wu5ZC0A/67o6-apnAks.jpg',
    fallback: 'VT'
  }
} satisfies Meta<AvatarImageProps>;

export default meta;
type Story = StoryObj<AvatarImageProps>;

export const Playground: Story = {
  render: ({ ...props }) => {
    return (
      <Avatar.Container>
        <Avatar.Image {...props} alt="Vadim Tregubenko" />
      </Avatar.Container>
    );
  }
};
