import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideArgsControl, reactNodeTextControl, selectControl } from '@storybook-config/shared';

import { CellInput, type CellInputProps } from './CellInput';

const meta = {
  title: 'Components/Cell/CellInput',
  component: CellInput,
  parameters: {
    cartesian: ['height']
  },
  argTypes: {
    ...hideArgsControl(['innerClassNames']),

    height: selectControl(['compact', 'normal']),
    before: reactNodeTextControl
  },
  args: {
    before: 'Имя',
    height: 'normal',
    placeholder: 'Иван Иванов',
    disabled: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
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
