import type { Meta, StoryObj } from '@storybook/react-vite';
import {hideArgsControl} from "@storybook-config/shared";
import { useState } from 'react';
import {fn} from "storybook/test";

import { Tabs } from './Tabs';

const meta = {
  component: Tabs,
  argTypes: {
    ...hideArgsControl(['innerClassNames', 'onClick', 'activeItem']),
  }
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 'tab 1',
        title: 'Tab 1',
        indicator: 1
      },
      {
        id: 'tab 2',
        title: 'Tab 2',
      },
      {
        id: 'tab 3',
        title: 'Tab 3',
        indicator: 3
      }
    ],
    activeItem: "tab 1",
    onClick: fn()
  },
  decorators: [
    (Story, context) => {
      const [activeItem, setActiveItem] = useState(context.args.activeItem);
      const [items, setItems] = useState(context.args.items);
      const deleteItem = (id: string) => setItems((prev) => prev.filter(prevItem => prevItem.id !== id));
      return (
        <Story
          args={{
            ...context.args,
            items,
            activeItem,
            onClick: setActiveItem,
            onCancel: deleteItem
          }}
        />
      );
    }
  ]
};
