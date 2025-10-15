import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../../../.storybook/shared/args-manager';
import { Typography, type TypographyBodyProps } from '../../index';
import { TypographyBody } from './TypographyBody';

const meta = {
  title: 'Common/Typography/Typography.Body',
  component: TypographyBody,
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    children: 'Hello world'
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
