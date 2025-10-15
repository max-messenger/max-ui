import type { Meta, StoryObj } from '@storybook/react-vite';

import Icon16Placeholder from '../../../../../.storybook/assets/icons/icon-16-placeholder.svg';
import Icon24Placeholder from '../../../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { hideArgsControl } from '../../../../../.storybook/shared/args-manager';
import { Flex } from '../../../Flex';
import { IconButton } from '../../../IconButton';
import { Avatar } from '../../index';
import { AvatarContainer, type AvatarContainerProps } from './AvatarContainer';

const meta = {
  title: 'Common/Avatar/Avatar.Container',
  component: AvatarContainer,
  argTypes: {
    ...hideArgsControl(['innerClassNames', 'asChild']),

    overlay: { type: 'boolean' },
    rightTopCorner: {
      options: [0, 1],
      mapping: [
        undefined,
        <Avatar.CloseButton key="close-button" aria-label="Закрыть" />
      ],
      control: {
        type: 'select',
        labels: ['None', 'Avatar.CloseButton']
      }
    },
    rightBottomCorner: {
      options: [0, 1, 2],
      mapping: [
        undefined,
        <Avatar.OnlineDot key="online-dot" />,
        <IconButton
          key="icon-button"
          aria-label="Добавить"
          size="small"
          appearance="neutral"
        >
          <Icon16Placeholder />
        </IconButton>
      ],
      control: {
        type: 'select',
        labels: ['None', 'Avatar.OnlineDot', 'IconButton']
      }
    }
  },
  args: {
    form: 'circle',
    size: 64,
    overlay: false
  },
  decorators: [
    (Story) => (
      <Flex gap={16}>
        <Story />
      </Flex>
    )
  ]
} satisfies Meta<AvatarContainerProps>;

export default meta;
type Story = StoryObj<AvatarContainerProps>;

export const Playground: Story = {
  render: ({ overlay, ...props }) => {
    return (
      <>
        <Avatar.Container
          {...props}
          overlay={Boolean(overlay) && (
            <Avatar.Overlay>
              <Icon24Placeholder />
            </Avatar.Overlay>
          )}
        >
          <Avatar.Icon>
            <Icon24Placeholder />
          </Avatar.Icon>
        </Avatar.Container>

        <Avatar.Container
          {...props}
          overlay={Boolean(overlay) && (
            <Avatar.Overlay>
              <Icon24Placeholder />
            </Avatar.Overlay>
          )}
        >
          <Avatar.Image
            src="https://sun9-21.userapi.com/1N-rJz6-7hoTDW7MhpWe19e_R_TdGV6Wu5ZC0A/67o6-apnAks.jpg"
            fallback="ME"
            fallbackGradient="green"
          />
        </Avatar.Container>

        <Avatar.Container
          {...props}
          overlay={Boolean(overlay) && (
            <Avatar.Overlay>
              <Icon24Placeholder />
            </Avatar.Overlay>
          )}
        >
          <Avatar.Text
            gradient="red"
          >
            ME
          </Avatar.Text>
        </Avatar.Container>
      </>
    );
  }
};

export const AsLink: Story = {
  name: 'As link',
  render: ({ overlay, ...props }) => {
    return (
      <>
        <Avatar.Container
          {...props}
          overlay={Boolean(overlay) && (
            <Avatar.Overlay>
              <Icon24Placeholder />
            </Avatar.Overlay>
          )}
          asChild
        >
          <a
            href="https://i.imgur.com/UCtRwFE.jpeg"
            target="_blank"
            rel="noreferrer"
          >
            <Avatar.Icon>
              <Icon24Placeholder />
            </Avatar.Icon>
          </a>
        </Avatar.Container>

        <Avatar.Container
          {...props}
          overlay={Boolean(overlay) && (
            <Avatar.Overlay>
              <Icon24Placeholder />
            </Avatar.Overlay>
          )}
          asChild
        >
          <a
            href="https://i.imgur.com/UCtRwFE.jpeg"
            target="_blank"
            rel="noreferrer"
          >
            <Avatar.Image
              src="https://sun9-21.userapi.com/1N-rJz6-7hoTDW7MhpWe19e_R_TdGV6Wu5ZC0A/67o6-apnAks.jpg"
              fallback="ME"
              fallbackGradient="green"
            />
          </a>
        </Avatar.Container>

        <Avatar.Container
          {...props}
          overlay={Boolean(overlay) && (
            <Avatar.Overlay>
              <Icon24Placeholder />
            </Avatar.Overlay>
          )}
          asChild
        >
          <a
            href="https://i.imgur.com/UCtRwFE.jpeg"
            target="_blank"
            rel="noreferrer"
          >
            <Avatar.Text
              gradient="red"
            >
              ME
            </Avatar.Text>
          </a>
        </Avatar.Container>
      </>
    );
  }
};
