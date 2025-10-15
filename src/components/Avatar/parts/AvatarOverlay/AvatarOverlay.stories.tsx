import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon24Placeholder from '../../../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { Avatar, type AvatarOverlayProps } from '../../index';
import { AvatarOverlay } from './AvatarOverlay';

const meta = {
  title: 'Common/Avatar/Avatar.Overlay',
  component: AvatarOverlay
} satisfies Meta<AvatarOverlayProps>;

export default meta;
type Story = StoryObj<AvatarOverlayProps>;

export const Playground: Story = {
  render: ({ ...props }) => {
    return (
      <Avatar.Container
        overlay={(
          <Avatar.Overlay {...props}>
            <Icon24Placeholder />
          </Avatar.Overlay>
        )}
      >
        <Avatar.Image src="https://sun9-21.userapi.com/1N-rJz6-7hoTDW7MhpWe19e_R_TdGV6Wu5ZC0A/67o6-apnAks.jpg" />
      </Avatar.Container>
    );
  }
};
