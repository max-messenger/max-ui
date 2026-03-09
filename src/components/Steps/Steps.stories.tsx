import type { Meta, StoryObj } from '@storybook/react';

import { Steps, type StepsProps } from './Steps';

const meta = {
  title: 'Blocks/Steps',
  component: Steps,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Отображает визуальный индикатор шагов или прогресса в процессе, например в учебнике или многоступенчатой форме.'
      }
    }
  },
  args: {
    count: 10,
    progress: 5
  }
} satisfies Meta<StepsProps>;

export default meta;
type Story = StoryObj<StepsProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <div
      style={{
        height: '100px',
        padding: 24,
        boxSizing: 'border-box'
      }}
    >
      <Steps {...args} />
    </div>
  )
};
