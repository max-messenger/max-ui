import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideArgsControl, reactNodeTextControl, selectControl } from '@storybook-config/shared';

import { Typography, type TypographyBodyProps } from '../../index';
import { TypographyBody } from './TypographyBody';

const meta = {
  title: 'Components/Typography/Typography.Body',
  component: TypographyBody,
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
    variant: 'large-strong'
  }
} satisfies Meta<TypographyBodyProps>;

export default meta;
type Story = StoryObj<TypographyBodyProps>;

export const Playground: Story = {
  render: (props) => {
    return (
      <Typography.Body {...props} />
    );
  }
};
