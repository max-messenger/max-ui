import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideArgsControl, reactNodeTextControl, selectControl } from '@storybook-config/shared';

import { Typography, type TypographyTitleProps } from '../../index';
import { TypographyTitle } from './TypographyTitle';

const meta = {
  title: 'Components/Typography/Typography.Title',
  component: TypographyTitle,
  parameters: {
    cartesian: ['variant']
  },
  argTypes: {
    ...hideArgsControl(['asChild']),
    variant: selectControl(['large-strong', 'medium', 'medium-strong', 'small', 'small-strong', 'custom']),
    children: reactNodeTextControl
  },
  args: {
    children: 'Hello world',
    variant: 'large-strong'
  }
} satisfies Meta<TypographyTitleProps>;

export default meta;
type Story = StoryObj<TypographyTitleProps>;

export const Playground: Story = {
  render: (props) => {
    return (
      <Typography.Title {...props} />
    );
  }
};
