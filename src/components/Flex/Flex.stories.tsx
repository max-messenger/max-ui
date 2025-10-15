import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Flex, type FlexProps } from './Flex';

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    gap: 12
  }
} satisfies Meta<FlexProps>;

export default meta;
type Story = StoryObj<FlexProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Flex {...args} style={{ width: 600 }}>
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
      </Flex>
    );
  }
};
