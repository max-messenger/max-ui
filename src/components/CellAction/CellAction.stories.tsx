import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Icon28Placeholder from '../../../.storybook/assets/icons/icon-28-placeholder.svg';
import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { EllipsisText } from '../EllipsisText';
import { CellAction, type CellActionProps } from './CellAction';

const meta = {
  title: 'Common/CellAction',
  component: CellAction,
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames']),

    before: {
      options: [0, 1],
      mapping: [
        undefined,
        <Icon28Placeholder key="icon" />
      ],
      control: {
        type: 'select',
        labels: ['None', 'Icon']
      }
    }
  },
  args: {
    children: 'Action',
    showChevron: true,
    before: 1,
    mode: 'primary',
    height: 'normal',
    disabled: false,
    onClick: fn()
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
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
