import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../../../.storybook/shared/args-manager';
import { Typography } from '../..';
import { TypographyLabel, type TypographyLabelProps } from './TypographyLabel';

const meta = {
  title: 'Common/Typography/Typography.Label',
  component: TypographyLabel,
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    children: 'Hello world'
  }
} satisfies Meta<TypographyLabelProps>;

export default meta;
type Story = StoryObj<TypographyLabelProps>;

export const Playground: Story = {
  render: (props) => {
    return (
      <Typography.Label {...props} />
    );
  }
};
