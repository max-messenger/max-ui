import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon24Placeholder from '../../../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { Avatar, type AvatarOnlineDotProps } from '../../index';
import { AvatarOnlineDot } from './AvatarOnlineDot';

const meta = {
  title: 'Common/Avatar/Avatar.OnlineDot',
  component: AvatarOnlineDot
} satisfies Meta<AvatarOnlineDotProps>;

export default meta;
type Story = StoryObj<AvatarOnlineDotProps>;

export const Playground: Story = {
  render: ({ ...props }) => {
    return (
      <Avatar.Container
        rightBottomCorner={<Avatar.OnlineDot {...props} />}
      >
        <Avatar.Icon>
          <Icon24Placeholder />
        </Avatar.Icon>
      </Avatar.Container>
    );
  }
};
