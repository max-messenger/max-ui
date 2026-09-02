import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon16Placeholder from '@storybook-config/assets/icons/icon-16-placeholder.svg';
import Icon24Placeholder from '@storybook-config/assets/icons/icon-24-placeholder.svg';
import { hideArgsControl, resolveOptionalControl, selectControl } from '@storybook-config/shared';

import { Flex } from '../../../../internal';
import { IconButton } from '../../../IconButton';
import { Avatar } from '../../index';
import { AvatarContainer, type AvatarContainerProps } from './AvatarContainer';

const meta = {
  title: 'Components/Avatar/Avatar.Container',
  component: AvatarContainer,
  parameters: {
    cartesian: ['form']
  },
  argTypes: {
    ...hideArgsControl(['innerClassNames', 'asChild']),

    form: selectControl(['circle', 'squircle']),
    size: selectControl([24, 40, 52, 72, 80, 88]),
    onlineStatus: {
      control: 'boolean',
      description: 'Shows the online indicator for circular avatars from 24 to 80 px.'
    },
    overlay: { control: 'boolean' },
    rightTopCorner: {
      options: ['None', 'Avatar.CloseButton'],
      control: { type: 'select' },
      table: { type: { summary: 'ReactNode' } }
    },
    rightBottomCorner: {
      options: ['None', 'IconButton'],
      control: { type: 'select' },
      table: { type: { summary: 'ReactNode' } },
      if: { arg: 'onlineStatus', eq: false },
      description: 'Available for avatars larger than 24 px when onlineStatus is disabled.'
    }
  },
  args: {
    form: 'circle',
    size: 40,
    onlineStatus: false,
    overlay: false,
    rightTopCorner: 'None',
    rightBottomCorner: 'None'
  },
  decorators: [
    (Story, context) => (
      <Flex gap={16}>
        <Story
          args={{
            ...context.args,
            rightTopCorner: resolveOptionalControl(
              { 'Avatar.CloseButton': <Avatar.CloseButton aria-label="Закрыть" /> },
              context.args.rightTopCorner
            ),
            rightBottomCorner: resolveOptionalControl(
              {
                IconButton: (
                  <IconButton aria-label="Добавить" size="small" variant="secondary">
                    <Icon16Placeholder />
                  </IconButton>
                )
              },
              context.args.rightBottomCorner
            )
          }}
        />
      </Flex>
    )
  ]
} satisfies Meta<AvatarContainerProps>;

export default meta;
type Story = StoryObj<AvatarContainerProps>;

const onlineStatusSizes = [24, 40, 52, 72, 80];

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
            МЕ
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
              МЕ
            </Avatar.Text>
          </a>
        </Avatar.Container>
      </>
    );
  }
};

export const OnlineStatus: Story = {
  args: {
    onlineStatus: true
  },
  render: (props) => (
    <>
      {onlineStatusSizes.map((size) => (
        <AvatarContainer
          {...props}
          size={size}
          key={size}
        >
          <Avatar.Image
            src="https://sun9-21.userapi.com/1N-rJz6-7hoTDW7MhpWe19e_R_TdGV6Wu5ZC0A/67o6-apnAks.jpg"
            fallback="VT"
            alt="Vadim Tregubenko"
          />
        </AvatarContainer>
      ))}
    </>
  )
};
