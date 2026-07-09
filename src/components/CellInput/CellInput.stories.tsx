import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { CellInput, type CellInputProps } from './CellInput';

const meta = {
  title: 'Components/Cell/CellInput',
  component: CellInput,
  parameters: {
    cartesian: ['height']
  },
  argTypes: {
    ...hideArgsControl(['innerClassNames']),

    before: { type: 'string' }
  },
  args: {
    before: 'First name',
    height: 'normal',
    placeholder: 'Иван Иванов',
    disabled: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<CellInputProps>;

export default meta;
type Story = StoryObj<CellInputProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return <CellInput {...args} />;
  }
};
