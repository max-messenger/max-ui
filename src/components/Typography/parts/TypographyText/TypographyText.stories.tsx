import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideArgsControl, reactNodeTextControl, selectControl } from '@storybook-config/shared';

import { Typography } from '../..';
import { TypographyText, type TypographyTextProps } from './TypographyText';

const meta = {
  title: 'Components/Typography/Typography.Text',
  component: TypographyText,
  parameters: {
    cartesian: ['variant']
  },
  argTypes: {
    ...hideArgsControl(['asChild']),
    variant: selectControl(['hero', 'header', 'subheader', 'title', 'body', 'body-strong', 'detail', 'detail-strong', 'description', 'description-strong', 'label', 'label-strong', 'tag', 'tag-strong', 'note', 'note-strong', 'action-large', 'action-medium', 'action-small', 'action-xsmall']),
    color: selectControl(['primary', 'secondary', 'tertiary', 'inherit']),
    children: reactNodeTextControl
  },
  args: {
    children: 'Hello world',
    variant: 'body',
    color: 'inherit'
  }
} satisfies Meta<TypographyTextProps>;

export default meta;
type Story = StoryObj<TypographyTextProps>;

export const Playground: Story = {
  render: (props) => <Typography.Text {...props} />
};
