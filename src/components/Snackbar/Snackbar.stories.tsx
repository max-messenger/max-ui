import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon28Placeholder from "@storybook-config/assets/icons/icon-28-placeholder.svg";
import {resolveOptionalReactNode, selectControl} from '@storybook-config/shared';
import { type ReactNode,useCallback } from 'react';

import { useSnackbar } from '../../hooks';
import { Button } from '../Button';
import {
  type SnackbarPlacement,
  SnackbarProvider,
  type SnackbarProviderProps
} from '.';

const PLACEMENTS: SnackbarPlacement[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
];

interface PlaygroundArgs {
  text: string;
  caption: string;
  placement: SnackbarPlacement;
  duration: number;
  offset: number;
  withBefore: boolean;
  withAction: boolean;
}

function PlaygroundTrigger({ args }: { args: PlaygroundArgs }) {
  const { showSnackbar } = useSnackbar();

  const handleShow = useCallback(() => {
    let after: ReactNode;
    if (args.withAction) {
      after = (
        <Button
          size="small"
          variant="primary-contrast"
          onClick={() => showSnackbar({ text: 'Действие выполнено', duration: 2000 })}
        >
          Отмена
        </Button>
      );
    }

    showSnackbar({
      text: args.text,
      caption: args.caption || undefined,
      placement: args.placement,
      duration: args.duration,
      offset: args.offset || undefined,
      before: resolveOptionalReactNode(args.withBefore, <Icon28Placeholder />),
      after
    });
  }, [args, showSnackbar]);

  return (
    <Button onClick={handleShow}>
      Показать снэкбар
    </Button>
  );
}

function PlacementsGrid() {
  const { showSnackbar } = useSnackbar();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, maxWidth: 480 }}>
      {PLACEMENTS.map((placement) => (
        <Button
          key={placement}
          size="small"
          variant="secondary"
          onClick={() => showSnackbar({ text: placement, placement, duration: 5000 })}
        >
          {placement}
        </Button>
      ))}
    </div>
  );
}

function WithActionTrigger() {
  const { showSnackbar } = useSnackbar();

  return (
    <Button
      onClick={() =>
        showSnackbar({
          text: 'Файл удалён',
          caption: 'Можно отменить в течение 5 секунд',
          placement: 'bottom-center',
          after: (
            <Button
              size="xsmall"
              variant="secondary-contrast"
              onClick={() => showSnackbar({ text: 'Восстановлено', duration: 2000 })}
            >
              Отменить
            </Button>
          )
        })
      }
    >
      Удалить файл
    </Button>
  );
}

const meta = {
  title: 'Components/Snackbar',
  component: SnackbarProvider,
  argTypes: {
    createId: { control: false },
  },
} satisfies Meta<SnackbarProviderProps>;

export default meta;
type Story = StoryObj<SnackbarProviderProps>;

export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    text: { control: 'text', description: 'Основной текст.' },
    caption: { control: 'text', description: 'Дополнительный мелкий текст.' },
    placement: selectControl(PLACEMENTS),
    duration: { control: 'number', description: 'Время показа в мс.' },
    offset: { control: 'number', description: 'Отступ от края в px.' },
    withBefore: { control: 'boolean', description: 'Показать слот before.' },
    withAction: { control: 'boolean', description: 'Показать слот after (кнопка действия).' },
  },
  args: {
    text: 'Сообщение сохранено',
    caption: 'Отправлено в облако',
    placement: 'bottom-center',
    duration: 5000,
    offset: 16,
    withBefore: true,
    withAction: true
  },
  render: (args) => (
    <SnackbarProvider>
      <PlaygroundTrigger args={args as PlaygroundArgs} />
    </SnackbarProvider>
  )
};

export const Placements: Story = {
  name: 'All placements',
  render: () => (
    <SnackbarProvider>
      <PlacementsGrid />
    </SnackbarProvider>
  )
};

export const WithAction: Story = {
  name: 'With action',
  render: () => (
    <SnackbarProvider>
      <WithActionTrigger />
    </SnackbarProvider>
  )
};
