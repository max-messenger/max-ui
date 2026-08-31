import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon28Placeholder from '@storybook-config/assets/icons/icon-28-placeholder.svg';
import { hideArgsControl, optionalReactNodeControl, reactNodeTextControl, resolveOptionalReactNode, selectControl } from '@storybook-config/shared';
import { fn } from 'storybook/test';

import { EllipsisText } from '../../internal';
import { CellAction, type CellActionProps } from './CellAction';

const meta = {
  title: 'Components/Cell/CellAction',
  component: CellAction,
  parameters: {
    cartesian: ['mode', 'height']
  },
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames']),

    mode: selectControl(['primary', 'secondary', 'themed', 'destructive', 'custom']),
    height: selectControl(['compact', 'normal']),
    children: reactNodeTextControl,
    before: optionalReactNodeControl
  },
  args: {
    children: 'Действие',
    showChevron: true,
    before: true,
    mode: 'primary',
    height: 'normal',
    disabled: false,
    onClick: fn()
  },
  decorators: [
    (Story, context) => (
      <div style={{ width: 375 }}>
        <Story
          args={{
            ...context.args,
            before: resolveOptionalReactNode(context.args.before, <Icon28Placeholder />)
          }}
        />
      </div>
    )
  ]
} satisfies Meta<CellActionProps>;

export default meta;
type Story = StoryObj<CellActionProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return <CellAction {...args} />;
  }
};

export const AsLink: Story = {
  name: 'As link',
  render: ({ children, ...args }) => {
    return (
      <CellAction {...args} asChild>
        <a
          href="https://i.imgur.com/u4gmFU3.png"
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      </CellAction>
    );
  }
};

export const Ellipsized: Story = {
  name: 'Ellipsized',
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  },
  render: ({ children, ...args }) => {
    return (
      <CellAction {...args}>
        <EllipsisText>
          {children}
        </EllipsisText>
      </CellAction>
    );
  }
};
