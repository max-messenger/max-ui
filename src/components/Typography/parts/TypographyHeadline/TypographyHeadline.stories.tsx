import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../../../.storybook/shared/args-manager';
import { Typography } from '../../index';
import { TypographyHeadline, type TypographyHeadlineProps } from './TypographyHeadline';

const meta = {
  title: 'Common/Typography/Typography.Headline',
  component: TypographyHeadline,
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    children: 'Hello world'
  }
} satisfies Meta<TypographyHeadlineProps>;

export default meta;
type Story = StoryObj<TypographyHeadlineProps>;

export const Playground: Story = {
  render: (props) => {
    return (
      <Typography.Headline {...props} />
    );
  }
};
