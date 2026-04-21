import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { SegmentedControl, type SegmentedControlProps } from './index';

const meta = {
  title: 'Navigation/SegmentedControl',
  component: SegmentedControl,
  argTypes: hideArgsControl(['children']),
  parameters: {
    docs: {
      description: {
        component: `
Компонент \`SegmentedControl\` используется для выбора одного из нескольких вариантов.
Представляет собой переключатель в виде сегментов, похожий на табы, но более компактный и визуально акцентированный.

🧠 Полезен в случаях, когда нужно переключать состояние/фильтр или выбирать категорию (например, "Все / Активные / Завершённые").
      `
      }
    }
  }
} satisfies Meta<typeof SegmentedControl>;

export default meta;

const labels = [
  { label: 'Первый', value: 'Первый' },
  { label: 'Второй', value: 'Второй' },
  { label: 'Третий', value: 'Третий' }
];

export const Playground: StoryObj<SegmentedControlProps> = {
  render: (args) => {
    const [selected, setSelected] = useState(labels[0].value);

    return (
      <SegmentedControl {...args}>
        {labels.map(({ value, label }) => (
          <SegmentedControl.Item
            key={value}
            selected={selected === value}
            onClick={() => {
              setSelected(value);
            }}
          >
            {label}
          </SegmentedControl.Item>
        ))}
      </SegmentedControl>
    );
  },
  decorators: [
    (Component) => (
      <div style={{ width: 500 }}>
        <Component />
      </div>
    )
  ]
};
