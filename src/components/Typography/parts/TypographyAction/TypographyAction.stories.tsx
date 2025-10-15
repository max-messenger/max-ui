import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../../../.storybook/shared/args-manager';
import { Typography } from '../..';
import { TypographyAction, type TypographyActionProps } from './TypographyAction';

const meta = {
  title: 'Common/Typography/Typography.Action',
  component: TypographyAction,
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    children: 'Hello world'
  }
} satisfies Meta<TypographyActionProps>;

export default meta;
type Story = StoryObj<TypographyActionProps>;

export const Playground: Story = {
  render: (props) => {
    return (
      <Typography.Action {...props} />
    );
  }
};
