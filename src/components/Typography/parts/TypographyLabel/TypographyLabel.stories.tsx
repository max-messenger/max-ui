import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideArgsControl, reactNodeTextControl, selectControl } from '@storybook-config/shared';

import { Typography } from '../..';
import { TypographyLabel, type TypographyLabelProps } from './TypographyLabel';

const meta = {
  title: 'Components/Typography/Typography.Label',
  component: TypographyLabel,
  parameters: {
    cartesian: ['variant']
  },
  argTypes: {
    ...hideArgsControl(['asChild']),
    variant: selectControl(['large', 'large-strong', 'medium', 'medium-strong', 'small', 'small-strong', 'custom']),
    children: reactNodeTextControl
  },
  args: {
    children: 'Hello world',
    variant: 'large'
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
