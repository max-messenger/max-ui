import type { Meta, StoryObj } from '@storybook/react-vite';
import {hideArgsControl} from "@storybook-config/shared";
import { useState } from 'react';
import {fn} from "storybook/test";

import { Segmented } from './Segmented';

const meta = {
  component: Segmented,
  argTypes: {
    ...hideArgsControl(['innerClassNames', 'onClick', 'activeItem']),
  }
} satisfies Meta<typeof Segmented>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Label',
      },
      {
        id: '2',
        title: 'Very long label',
      },
      {
        id: '3',
        title: 'Label',
      },
      {
        id: '4',
        title: 'Label',
      },
      {
        id: '5',
        title: 'Long Label',
      },
    ],
    activeItem: "1",
    onClick: fn()
  },
  decorators: [
    (Story, context) => {
      const [activeItem, setActiveItem] = useState(context.args.activeItem);
      return (
        <Story
          args={{
            ...context.args,
            activeItem,
            onClick: setActiveItem,
          }}
        />
      );
    }
  ]
};
