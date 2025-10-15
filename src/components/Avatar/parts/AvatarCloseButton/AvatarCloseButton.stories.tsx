import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon24Placeholder from '../../../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { Avatar, type AvatarCloseButtonProps } from '../../index';
import { AvatarCloseButton } from './AvatarCloseButton';

const meta = {
  title: 'Common/Avatar/Avatar.CloseButton',
  component: AvatarCloseButton
} satisfies Meta<AvatarCloseButtonProps>;

export default meta;
type Story = StoryObj<AvatarCloseButtonProps>;

export const Playground: Story = {
  render: ({ ...props }) => {
    return (
      <Avatar.Container
        rightTopCorner={<Avatar.CloseButton aria-label="Закрыть" {...props} />}
      >
        <Avatar.Icon>
          <Icon24Placeholder />
        </Avatar.Icon>
      </Avatar.Container>
    );
  }
};
