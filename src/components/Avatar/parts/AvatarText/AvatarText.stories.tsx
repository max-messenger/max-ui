import type { Meta, StoryObj } from '@storybook/react-vite';
import { reactNodeTextControl, selectControl } from '@storybook-config/shared';

import { Avatar, type AvatarTextProps } from '../../index';
import { AvatarText } from './AvatarText';

const meta = {
  title: 'Components/Avatar/Avatar.Text',
  component: AvatarText,
  parameters: {
    cartesian: ['gradient']
  },
  argTypes: {
    gradient: selectControl(['red', 'orange', 'green', 'blue', 'purple', 'custom']),
    children: reactNodeTextControl
  },
  args: {
    children: 'VT',
    gradient: 'red'
  }
} satisfies Meta<AvatarTextProps>;

export default meta;
type Story = StoryObj<AvatarTextProps>;

export const Playground: Story = {
  render: ({ ...props }) => {
    return (
      <Avatar.Container>
        <Avatar.Text {...props} />
      </Avatar.Container>
    );
  }
};
