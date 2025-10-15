import type { Meta, StoryObj } from '@storybook/react-vite';

import { CellSimple } from '../CellSimple';
import { Switch, type SwitchProps } from './Switch';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  args: {
    disabled: false
  }
} satisfies Meta<SwitchProps>;

export default meta;
type Story = StoryObj<SwitchProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Switch
        {...args}
        defaultChecked={false}
      />
    );
  }
};

export const WithCell: Story = {
  name: 'Cell with Switch',
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ],
  render: ({ ...args }) => {
    return (
      <CellSimple
        as="label"
        after={(
          <Switch
            {...args}
            defaultChecked={false}
          />
        )}
        title="Cell"
        subtitle="Description"
      />
    );
  }
};
