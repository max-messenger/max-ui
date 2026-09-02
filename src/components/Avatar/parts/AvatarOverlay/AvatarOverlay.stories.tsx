import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon24Placeholder from '@storybook-config/assets/icons/icon-24-placeholder.svg';

import { Avatar, type AvatarOverlayProps } from '../../index';
import { AvatarOverlay } from './AvatarOverlay';

interface AvatarOverlayStoryArgs extends AvatarOverlayProps {
  src?: string
}

const meta = {
  title: 'Components/Avatar/Avatar.Overlay',
  component: AvatarOverlay,
  argTypes: {
    src: { control: 'text' }
  },
  args: {
    src: 'https://sun9-21.userapi.com/1N-rJz6-7hoTDW7MhpWe19e_R_TdGV6Wu5ZC0A/67o6-apnAks.jpg'
  }
} satisfies Meta<AvatarOverlayStoryArgs>;

export default meta;
type Story = StoryObj<AvatarOverlayStoryArgs>;

export const Playground: Story = {
  render: ({ src, ...props }) => {
    return (
      <Avatar.Container
        overlay={(
          <Avatar.Overlay {...props}>
            <Icon24Placeholder />
          </Avatar.Overlay>
        )}
      >
        <Avatar.Image src={src} />
      </Avatar.Container>
    );
  }
};
