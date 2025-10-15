import type { Meta, StoryObj } from '@storybook/react-vite';

import { Ripple, type RippleProps } from './Ripple';

const meta = {
  title: 'Helpers/Ripple',
  component: Ripple
} satisfies Meta<RippleProps>;

export default meta;
type Story = StoryObj<RippleProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <div style={{ position: 'relative', width: 300, height: 300, border: '2px solid', overflow: 'hidden' }}>
        Нажимай на меня!!!

        <Ripple
          {...args}
          style={{
            position: 'absolute',
            inset: 0
          }}
        />
      </div>
    );
  }
};
