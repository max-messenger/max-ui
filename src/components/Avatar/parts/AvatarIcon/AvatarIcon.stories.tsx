import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon24Placeholder from '../../../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { Avatar, type AvatarIconProps } from '../../index';
import { AvatarIcon } from './AvatarIcon';

const meta = {
  title: 'Common/Avatar/Avatar.Icon',
  component: AvatarIcon
} satisfies Meta<AvatarIconProps>;

export default meta;
type Story = StoryObj<AvatarIconProps>;

export const Playground: Story = {
  render: ({ ...props }) => {
    return (
      <Avatar.Container>
        <Avatar.Icon {...props}>
          <Icon24Placeholder />
        </Avatar.Icon>
      </Avatar.Container>
    );
  }
};
