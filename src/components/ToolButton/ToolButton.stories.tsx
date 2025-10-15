import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Icon24Placeholder from '../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Flex } from '../Flex';
import { Panel } from '../Panel';
import { ToolButton, type ToolButtonProps } from './ToolButton';

const meta = {
  title: 'Common/ToolButton',
  component: ToolButton,
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames', 'icon']),
    children: { type: 'string' }
  },
  args: {
    children: 'Button',
    icon: <Icon24Placeholder />,
    onClick: fn(),
    appearance: 'default',
    disabled: false
  },
  decorators: [
    (Story) => (
      <Panel mode="secondary" style={{ width: 375, padding: 16 }}>
        <Flex gap={8}>
          <Story />
          <Story />
          <Story />
          <Story />
        </Flex>
      </Panel>
    )
  ]
} satisfies Meta<ToolButtonProps>;

export default meta;
type Story = StoryObj<ToolButtonProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <ToolButton{...args} />
    );
  }
};

export const AsLink: Story = {
  name: 'As link',
  args: {
    children: 'Ссылка',
    onClick: undefined
  },
  render: ({ children, ...args }) => {
    return (
      <ToolButton {...args} asChild>
        <a
          href="https://imgur.com/KFEnxtU"
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      </ToolButton>
    );
  }
};
