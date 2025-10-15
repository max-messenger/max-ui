import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../../../.storybook/shared/args-manager';
import { Typography, type TypographyTitleProps } from '../../index';
import { TypographyTitle } from './TypographyTitle';

const meta = {
  title: 'Common/Typography/Typography.Title',
  component: TypographyTitle,
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    children: 'Hello world'
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
