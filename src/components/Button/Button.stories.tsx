import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode } from 'react';

import Icon16Placeholder from '../../../.storybook/assets/icons/icon-16-placeholder.svg';
import Icon24Placeholder from '../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { OverlayContainer } from '../../../.storybook/components/OverlayContainer';
import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { useColorScheme } from '../../hooks';
import { Counter } from '../Counter';
import { Dot } from '../Dot';
import { Button, type ButtonProps, type ButtonSize } from './Button';

const iconsMapping: Record<ButtonSize, ReactNode> = {
  small: <Icon16Placeholder />,
  medium: <Icon24Placeholder />,
  large: <Icon24Placeholder />
};

const meta = {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames']),

    iconBefore: { control: 'boolean' },
    iconAfter: { control: 'boolean' },
    indicator: {
      options: [0, 1, 2],
      mapping: [undefined, <Counter key="counter" value={123456} />, <Dot key="dot" aria-label="Есть новые уведомления" />],
      control: {
        type: 'select',
        labels: ['None', 'Counter', 'Dot']
      }
    }
  },
  args: {
    mode: 'primary',
    appearance: 'themed',
    size: 'medium',
    iconAfter: false,
    iconBefore: false,
    indicator: 0,
    children: 'Button',
    disabled: false,
    stretched: false,
    loading: false
  },
  decorators: [
    (Story, context) => {
      const colorScheme = useColorScheme();

      return (
        <OverlayContainer
          style={{ width: 375 }}
          appearance={context.args.appearance === 'contrast-static' || colorScheme === 'dark' ? 'dark' : 'light'}
        >
          <Story />
        </OverlayContainer>
      );
    }
  ]
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
