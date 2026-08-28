import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideArgsControl, reactNodeTextControl, selectControl } from '@storybook-config/shared';

import { Typography } from '../../index';
import { TypographyHeadline, type TypographyHeadlineProps } from './TypographyHeadline';

const meta = {
  title: 'Components/Typography/Typography.Headline',
  component: TypographyHeadline,
  parameters: {
    cartesian: ['variant']
  },
  argTypes: {
    ...hideArgsControl(['asChild']),
    variant: selectControl(['large-strong', 'medium', 'small', 'custom']),
    children: reactNodeTextControl
  },
  args: {
    children: 'Hello world',
    variant: 'large-strong'
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
