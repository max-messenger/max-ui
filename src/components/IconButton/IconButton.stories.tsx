import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon16Placeholder from '@storybook-config/assets/icons/icon-16-placeholder.svg';
import Icon24Placeholder from '@storybook-config/assets/icons/icon-24-placeholder.svg';
import { disableArgs, hideArgsControl, selectControl } from '@storybook-config/shared';
import { type ReactNode } from 'react';

import { IconButton, type IconButtonProps, type IconButtonSize } from './IconButton';

const iconsMapping: Record<IconButtonSize, ReactNode> = {
  xsmall: <Icon16Placeholder />,
  small: <Icon16Placeholder />,
  medium: <Icon24Placeholder />,
  large: <Icon24Placeholder />
};

const meta = {
  title: 'Components/Button/IconButton',
  component: IconButton,
  parameters: {
    cartesian: ['variant', 'size']
  },
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames']),
    ...disableArgs(['aria-label']),

    variant: selectControl(['primary', 'secondary', 'ghost', 'primary-contrast', 'secondary-contrast', 'overlay', 'destructive']),
    size: selectControl(['xsmall', 'small', 'medium', 'large'])
  },
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    'aria-label': 'Название кнопки'
  }
} satisfies Meta<IconButtonProps>;

export default meta;
type Story = StoryObj<IconButtonProps>;

export const Playground: Story = {
  render: ({ size = 'medium', 'aria-label': ariaLabel, loading, ...args }) => {
    return (
      <IconButton
        {...args}
        size={size}
        loading={loading}
        aria-label={loading ? 'Загрузка...' : ariaLabel}
      >
        {iconsMapping[size]}
      </IconButton>
    );
  }
};

export const AsLink: Story = {
  name: 'As link',
  render: ({ size = 'medium', 'aria-label': ariaLabel, loading, ...args }) => {
    return (
      <IconButton
        {...args}
        size={size}
        asChild
        loading={loading}
        aria-label={loading ? 'Загрузка...' : ariaLabel}
      >
        <a
          href="https://imgur.com/KFEnxtU"
          target="_blank"
          rel="noreferrer"
        >
          {iconsMapping[size]}
        </a>
      </IconButton>
    );
  }
};
