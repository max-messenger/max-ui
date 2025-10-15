import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Grid, type GridProps } from './Grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    gapX: 30,
    gapY: 10,
    cols: 3
  }
} satisfies Meta<GridProps>;

export default meta;
type Story = StoryObj<GridProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Grid {...args} style={{ width: 600 }}>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'var(--background-surface-secondary)',
              width: 75,
              height: 75
            }}
          />
        ))}
      </Grid>
    );
  }
};
