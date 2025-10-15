import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../../../.storybook/shared/args-manager';
import { Typography } from '../../index';
import { TypographyDisplay, type TypographyDisplayProps } from './TypographyDisplay';

const meta = {
  title: 'Common/Typography/Typography.Display',
  component: TypographyDisplay,
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    children: 'Hello world'
  }
} satisfies Meta<TypographyDisplayProps>;

export default meta;
type Story = StoryObj<TypographyDisplayProps>;

export const Playground: Story = {
  render: (props) => {
    return (
      <Typography.Display {...props} />
    );
  }
};
