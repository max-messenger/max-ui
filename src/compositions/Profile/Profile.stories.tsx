import type { Meta, StoryObj } from '@storybook/react-vite';

import { Profile } from './Profile';

const meta = {
  title: 'Compositions/Profile',
  component: Profile,
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Playground: Story = {};
