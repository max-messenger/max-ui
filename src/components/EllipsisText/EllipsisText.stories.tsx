import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { EllipsisText, type EllipsisTextProps } from './EllipsisText';

const meta = {
  title: 'Helpers/EllipsisText',
  component: EllipsisText,
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    maxLines: 1
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<EllipsisTextProps>;

export default meta;
type Story = StoryObj<EllipsisTextProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return <EllipsisText {...args} />;
  }
};
