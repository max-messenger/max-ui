import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../../../.storybook/shared/args-manager';
import { Typography } from '../..';
import { TypographyText, type TypographyTextProps } from './TypographyText';

const meta = {
  title: 'Components/Typography/Typography.Text',
  component: TypographyText,
  parameters: {
    cartesian: ['variant']
  },
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    children: 'Hello world'
  }
} satisfies Meta<TypographyTextProps>;

export default meta;
type Story = StoryObj<TypographyTextProps>;

export const Playground: Story = {
  render: (props) => <Typography.Text {...props} />
};
