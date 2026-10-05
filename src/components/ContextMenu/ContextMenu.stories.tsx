import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon20Placeholder from '@storybook-config/assets/icons/icon-20-placeholder.svg';
import Icon24Placeholder from '@storybook-config/assets/icons/icon-24-placeholder.svg';
import { hideArgsControl, selectControl } from '@storybook-config/shared';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { ContextMenu } from './ContextMenu';
import { type ContextMenuActionBar, type ContextMenuItem, type ContextMenuProps } from './types';

const onActionClick = fn();

// Меню чата — как на референсных скриншотах
const chatItems: ContextMenuItem[] = [
  { id: 'edit-name', label: 'Edit name', onClick: onActionClick },
  { id: 'edit-avatar', label: 'Edit avatar', onClick: onActionClick },
  {
    id: 'custom-status',
    label: 'Set custom status',
    items: [
      { id: 'status-emoji', label: 'Emoji', onClick: onActionClick },
      { id: 'status-text', label: 'Text', onClick: onActionClick }
    ]
  },
  { id: 'add-member', label: 'Add member', hint: '+', onClick: onActionClick },
  { id: 'add-bot', label: 'Add bot', hint: '+', onClick: onActionClick },
  { id: 'copy-link', label: 'Copy chat link', hint: '⌘C', divider: true, onClick: onActionClick },
  { id: 'report', label: 'Report', onClick: onActionClick },
  { id: 'leave', label: 'Leave chat', mode: 'destructive', divider: true, onClick: onActionClick }
];

const chatActionBar: ContextMenuActionBar = [
  { id: 'pin', icon: <Icon24Placeholder />, label: 'Pin', onClick: onActionClick },
  { id: 'mute', icon: <Icon24Placeholder />, label: 'Mute', onClick: onActionClick },
  { id: 'search', icon: <Icon24Placeholder />, onClick: onActionClick }
];

const nestedItems: ContextMenuItem[] = [
  {
    id: 'move-to',
    label: 'Move to chat',
    before: <Icon20Placeholder />,
    items: [
      {
        id: 'move-to-folder',
        label: 'Folder',
        items: [
          { id: 'folder-work', label: 'Work', onClick: onActionClick },
          { id: 'folder-personal', label: 'Personal', onClick: onActionClick },
          { id: 'folder-archive', label: 'Archive', divider: true, onClick: onActionClick }
        ]
      },
      { id: 'move-to-general', label: 'General', onClick: onActionClick }
    ]
  },
  { id: 'copy-message', label: 'Copy message', hint: '⌘C', onClick: onActionClick },
  { id: 'delete-message', label: 'Delete message', mode: 'destructive', divider: true, onClick: onActionClick }
];

const offsetItems: ContextMenuItem[] = [
  { id: 'pin-chat', label: 'Pin chat', before: <Icon20Placeholder />, onClick: onActionClick },
  { id: 'mute-chat', label: 'Mute chat', before: <Icon20Placeholder />, onClick: onActionClick },
  { id: 'mark-read', label: 'Mark as read', offset: true, onClick: onActionClick },
  { id: 'clear-history', label: 'Clear history', offset: true, mode: 'destructive', onClick: onActionClick }
];

const statesItems: ContextMenuItem[] = [
  { id: 'copy-text', label: 'Copy text', hint: '⌘C', onClick: onActionClick },
  { id: 'forward', label: 'Forward message', hint: '⌘↵', onClick: onActionClick },
  { id: 'edit-message', label: 'Edit message', disabled: true, divider: true },
  { id: 'pin-message', label: 'Pin message', onClick: onActionClick },
  {
    id: 'delete-for-all',
    label: 'Delete for all',
    mode: 'destructive',
    divider: true,
    hint: '⌫',
    onClick: onActionClick
  }
];

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    cartesian: ['openOn', 'mode'],
    docs: {
      description: {
        component: 'Контекстное меню, которое открывается по клику или наведению на триггер. На десктопе вложенные пункты открываются рядом с меню, на мобильных — раскрываются аккордеоном.'
      }
    }
  },
  argTypes: {
    ...hideArgsControl(['asChild', 'children', 'items', 'actionBar', 'innerClassNames', 'onOpenChange', 'open', 'defaultOpen']),

    openOn: selectControl(['click', 'hover']),
    mode: selectControl(['auto', 'desktop', 'mobile']),
    placement: selectControl(['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start'])
  },
  args: {
    items: chatItems,
    openOn: 'click',
    mode: 'auto',
    placement: 'bottom-start'
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'flex-start', minHeight: 480, padding: 24 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<ContextMenuProps>;

export default meta;
type Story = StoryObj<ContextMenuProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <ContextMenu {...args}>
        <Button variant="secondary" size="small">Открыть меню</Button>
      </ContextMenu>
    );
  }
};

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <ContextMenu {...args}>
        <IconButton variant="secondary" size="small" aria-label="Открыть меню чата">⋮</IconButton>
      </ContextMenu>
    );
  }
};

export const WithActionBar: Story = {
  name: 'Action bar',
  args: {
    actionBar: chatActionBar
  },
  render: ({ ...args }) => {
    return (
      <ContextMenu {...args}>
        <IconButton variant="secondary" size="small" aria-label="Открыть меню чата">⋮</IconButton>
      </ContextMenu>
    );
  }
};

export const OpenOnHover: Story = {
  name: 'Open on hover',
  args: {
    openOn: 'hover'
  },
  render: ({ ...args }) => {
    return (
      <ContextMenu {...args}>
        <Button variant="secondary" size="small">Наведи на меня</Button>
      </ContextMenu>
    );
  }
};

export const NestedSubmenus: Story = {
  name: 'Nested submenus',
  parameters: {
    docs: {
      description: {
        story: 'На десктопе вложенные пункты открываются рядом при наведении (справа, при нехватке места — слева). Переключите mode в `mobile`, чтобы увидеть аккордеон.'
      }
    }
  },
  args: {
    items: nestedItems
  },
  render: ({ ...args }) => {
    return (
      <ContextMenu {...args}>
        <Button variant="secondary" size="small">Открыть меню</Button>
      </ContextMenu>
    );
  }
};

export const MobileAccordion: Story = {
  name: 'Mobile accordion',
  parameters: {
    docs: {
      description: {
        story: 'В мобильском режиме вложенные пункты раскрываются аккордеоном внутри основного меню.'
      }
    }
  },
  args: {
    items: nestedItems,
    mode: 'mobile'
  },
  render: ({ ...args }) => {
    return (
      <div style={{ maxWidth: 360 }}>
        <ContextMenu {...args}>
          <Button variant="secondary" size="small">Открыть меню</Button>
        </ContextMenu>
      </div>
    );
  }
};

export const OffsetIcons: Story = {
  name: 'Offset icons',
  parameters: {
    docs: {
      description: {
        story: 'Пункты без иконки, но с `offset: true` резервируют место слева — текст остаётся на одной оси с остальными пунктами.'
      }
    }
  },
  args: {
    items: offsetItems
  },
  render: ({ ...args }) => {
    return (
      <ContextMenu {...args}>
        <IconButton variant="secondary" size="small" aria-label="Открыть меню чата">⋮</IconButton>
      </ContextMenu>
    );
  }
};

export const ItemStates: Story = {
  name: 'Hints, disabled & destructive',
  args: {
    items: statesItems
  },
  render: ({ ...args }) => {
    return (
      <ContextMenu {...args}>
        <Button variant="secondary" size="small">Открыть меню</Button>
      </ContextMenu>
    );
  }
};

const itemPropertiesItems: ContextMenuItem[] = [
  { id: 'label-only', label: 'Label only', onClick: onActionClick },
  { id: 'with-icon', label: 'Before icon', before: <Icon20Placeholder />, onClick: onActionClick },
  { id: 'with-hint', label: 'With hint', hint: '⌘K', onClick: onActionClick },
  { id: 'with-offset', label: 'Offset without icon', offset: true, onClick: onActionClick },
  {
    id: 'with-submenu',
    label: 'With submenu',
    items: [
      { id: 'nested-item', label: 'Nested item', onClick: onActionClick }
    ]
  },
  { id: 'disabled', label: 'Disabled', disabled: true, divider: true },
  { id: 'destructive', label: 'Destructive', mode: 'destructive', divider: true, onClick: onActionClick }
];

export const ItemProperties: Story = {
  name: 'Item properties',
  parameters: {
    docs: {
      description: {
        story: 'Поля объекта `ContextMenuItem` из пропа `items`: `id` — уникальный ключ; `label` — подпись; `before` — иконка слева; `hint` — подсказка справа (например `⌘C`); `offset: true` — резерв места слева без иконки; `items` — вложенные пункты (подменю, вложенность не ограничена); `divider: true` — разделитель над пунктом; `disabled` — неактивный пункт; `mode: "destructive"` — опасное действие; `onClick` — обработчик клика.'
      }
    }
  },
  args: {
    items: itemPropertiesItems
  },
  render: ({ ...args }) => {
    return (
      <ContextMenu {...args}>
        <Button variant="secondary" size="small">Открыть меню</Button>
      </ContextMenu>
    );
  }
};

const ControlledDemo = (props: Omit<ContextMenuProps, 'children'>) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <ContextMenu {...props} open={open} onOpenChange={setOpen}>
        <Button variant="secondary" size="small">Открыть меню</Button>
      </ContextMenu>

      <Button variant="ghost" size="small" onClick={() => { setOpen(false); }}>
        Закрыть программно
      </Button>
    </div>
  );
};

export const Controlled: Story = {
  name: 'Controlled open state',
  parameters: {
    docs: {
      description: {
        story: 'Открытым состоянием можно управлять извне через `open` + `onOpenChange`.'
      }
    }
  },
  render: ({ ...args }) => {
    return <ControlledDemo {...args} />;
  }
};

export const AsChild: Story = {
  name: 'asChild trigger',
  parameters: {
    docs: {
      description: {
        story: 'С пропом `asChild` триггером выступает сам дочерний элемент — без лишней обёртки.'
      }
    }
  },
  render: ({ ...args }) => {
    return (
      <ContextMenu {...args} asChild>
        <Button variant="primary" size="small">Я сам триггер</Button>
      </ContextMenu>
    );
  }
};
