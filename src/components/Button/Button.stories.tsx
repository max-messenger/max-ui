import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode } from 'react';

import Icon16Placeholder from '../../../.storybook/assets/icons/icon-16-placeholder.svg';
import Icon24Placeholder from '../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Counter } from '../Counter';
import { Dot } from '../Dot/';
import { Button, type ButtonProps, type ButtonSize } from './Button';

const iconsMapping: Record<ButtonSize, ReactNode> = {
  xsmall: <Icon16Placeholder />,
  small: <Icon16Placeholder />,
  medium: <Icon24Placeholder />,
  large: <Icon24Placeholder />
};

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames']),

    iconBefore: { control: 'boolean' },
    iconAfter: { control: 'boolean' },
    indicator: {
      options: [0, 1, 2],
      mapping: [undefined, <Counter key="counter" value={1} />, <Dot key="dot" aria-label="Есть новые уведомления" />],
      control: {
        type: 'select',
        labels: ['None', 'Counter', 'Dot']
      }
    }
  },
  args: {
    variant: 'primary',
    size: 'medium',
    iconAfter: false,
    iconBefore: false,
    indicator: 0,
    children: 'Button',
    disabled: false,
    stretched: false,
    loading: false
  }
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Playground: Story = {
  render: ({ iconBefore, iconAfter, indicator, size = 'medium', loading, ...args }) => {
    return (
      <Button
        {...args}
        size={size}
        iconBefore={Boolean(iconBefore) && iconsMapping[size]}
        iconAfter={Boolean(iconAfter) && iconsMapping[size]}
        indicator={indicator}
        loading={loading}
        aria-label={loading ? 'Loading...' : undefined}
      />
    );
  }
};

export const AsLink: Story = {
  name: 'As link',
  args: {
    children: 'Я — ссылка!',
    onClick: undefined
  },
  render: ({ iconBefore, iconAfter, indicator, loading, size = 'medium', children, ...args }) => {
    return (
      <Button
        {...args}
        size={size}
        iconBefore={Boolean(iconBefore) && iconsMapping[size]}
        iconAfter={Boolean(iconAfter) && iconsMapping[size]}
        indicator={indicator}
        loading={loading}
        aria-label={loading ? 'Loading...' : undefined}
        asChild
      >
        <a
          href="https://imgur.com/KFEnxtU"
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      </Button>
    );
  }
};
