import type { Meta, StoryObj } from '@storybook/react-vite';
import { hideArgsControl } from '@storybook-config/shared';
import { useState } from 'react';

import { Button } from '../Button';
import { BottomSheet, type BottomSheetProps } from './BottomSheet';

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    docs: {
      description: {
        component: 'Нижняя шторка (bottom sheet). Открывается поверх оверлея, закрывается по клику на оверлей, кнопке или клавише Escape.'
      }
    }
  },
  argTypes: {
    ...hideArgsControl(['children', 'onClose', 'open'])
  },
  args: {
    title: 'Заголовок шторки'
  },
  decorators: [
    (Story, context) => {
      const [open, setOpen] = useState(false);

      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 320, padding: 24 }}>
          <Button
            variant="secondary"
            size="small"
            onClick={() => { setOpen(true); }}
          >
            Открыть шторку
          </Button>

          <Story
            args={{
              ...context.args,
              open,
              onClose: () => { setOpen(false); }
            }}
          />
        </div>
      );
    }
  ]
} satisfies Meta<BottomSheetProps>;

export default meta;

type Story = StoryObj<BottomSheetProps>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <BottomSheet {...args}>
        <Button variant="primary" size="medium" stretched onClick={args.onClose}>
          Закрыть
        </Button>
      </BottomSheet>
    );
  }
};

export const WithText: Story = {
  render: ({ ...args }) => {
    return (
      <BottomSheet {...args}>
        <p style={{ margin: 0 }}>
          Шторка закрывается по клику на затемнённый оверлей, по клавише Escape
          или кнопке внутри содержимого.
        </p>
      </BottomSheet>
    );
  }
};

export const WithoutTitle: Story = {
  args: {
    title: undefined
  },
  render: ({ ...args }) => {
    return (
      <BottomSheet {...args}>
        <Button variant="secondary" size="medium" stretched onClick={args.onClose}>
          Закрыть
        </Button>
      </BottomSheet>
    );
  }
};

export const WithMinHeight: Story = {
  args: {
    minHeight: 50
  },
  render: ({ ...args }) => {
    return (
      <BottomSheet {...args}>
        <Button variant="primary" size="medium" stretched onClick={args.onClose}>
          Закрыть
        </Button>
      </BottomSheet>
    );
  }
};
