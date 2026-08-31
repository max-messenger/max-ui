import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon16Placeholder from '@storybook-config/assets/icons/icon-16-placeholder.svg';
import Icon24Placeholder from '@storybook-config/assets/icons/icon-24-placeholder.svg';
import { hideArgsControl, optionalReactNodeControl, reactNodeTextControl, resolveOptionalReactNode, selectControl } from '@storybook-config/shared';
import { type ReactNode } from 'react';

import { Counter } from '../Counter';
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
  parameters: {
    cartesian: ['variant', 'size']
  },
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames']),

    variant: selectControl(['primary', 'secondary', 'ghost', 'primary-contrast', 'secondary-contrast', 'overlay', 'destructive']),
    size: selectControl(['xsmall', 'small', 'medium', 'large']),
    children: reactNodeTextControl,
    iconBefore: { control: 'boolean' },
    iconAfter: { control: 'boolean' },
    indicator: optionalReactNodeControl
  },
  args: {
    variant: 'primary',
    size: 'medium',
    iconAfter: false,
    iconBefore: false,
    indicator: false,
    children: 'Кнопка',
    disabled: false,
    stretched: false,
    loading: false
  },
  decorators: [
    (Story, context) => (
      <Story
        args={{
          ...context.args,
          indicator: resolveOptionalReactNode(context.args.indicator, <Counter value={1} />)
        }}
      />
    )
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
        aria-label={loading ? 'Загрузка...' : undefined}
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
        aria-label={loading ? 'Загрузка...' : undefined}
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
