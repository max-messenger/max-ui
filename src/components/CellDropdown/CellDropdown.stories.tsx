import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { CellDropdown, type CellDropdownProps } from './CellDropdown';

const meta = {
  title: 'Common/CellDropdown',
  component: CellDropdown,
  argTypes: {
    ...hideArgsControl(['innerClassNames']),

    before: { type: 'string' },
    options: { control: false }
  },
  args: {
    before: 'Country',
    height: 'normal',
    disabled: false,
    showChevron: false,
    placeholder: 'Выберите страну',
    options: [
      { key: 'ru', title: 'Россия' },
      { key: 'us', title: 'США' },
      { key: 'uk', title: 'Великобритания' },
      { key: 'de', title: 'Германия' },
      { key: 'fr', title: 'Франция' }
    ]
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<CellDropdownProps>;

export default meta;
type Story = StoryObj<CellDropdownProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<string | number>('');

    return (
      <CellDropdown
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  }
};

export const WithDefaultValue: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<string | number>('us');

    return (
      <CellDropdown
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  }
};

export const Compact: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<string | number>('');

    return (
      <CellDropdown
        {...args}
        height="compact"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  }
};

export const Disabled: Story = {
  render: ({ ...args }) => {
    return <CellDropdown {...args} disabled value="ru" />;
  }
};

export const NumericKeys: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<string | number>('');

    return (
      <CellDropdown
        {...args}
        before="Age"
        options={[
          { key: 18, title: '18 лет' },
          { key: 25, title: '25 лет' },
          { key: 30, title: '30 лет' },
          { key: 35, title: '35 лет' },
          { key: 40, title: '40 лет' }
        ]}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  }
};

export const WithChevron: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<string | number>('');

    return (
      <CellDropdown
        {...args}
        showChevron
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  }
};

export const WithSubtitleAndOverline: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<string | number>('');

    return (
      <CellDropdown
        {...args}
        options={[
          { key: 'ru', title: 'Россия', subtitle: 'Москва', overline: 'Европа' },
          { key: 'us', title: 'США', subtitle: 'Вашингтон', overline: 'Северная Америка' },
          { key: 'uk', title: 'Великобритания', subtitle: 'Лондон', overline: 'Европа' },
          { key: 'de', title: 'Германия', subtitle: 'Берлин', overline: 'Европа' },
          { key: 'fr', title: 'Франция', subtitle: 'Париж', overline: 'Европа' }
        ]}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    );
  }
};
