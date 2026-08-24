# Migration guide: 0.2.1 → 0.3.0

В `0.3.0` цветовые токены и привязки компонентов приведены к актуальной семантике. Старые опубликованные токены пока остаются в палитре для совместимости, но компоненты больше не обязаны использовать их внутри. Если приложение переопределяет CSS-переменные maxUI, обновите такие переопределения по таблицам ниже.

## Цветовые токены

Значения активных токенов Light/Dark синхронизированы с токенами Figma. В частности, изменились значения основных `--text-*` и `--icon-*` токенов, включая `--text-primary`, `--text-secondary`, `--text-tertiary`, `--icon-primary` и `--icon-tertiary`.

Основные новые семантические группы:

- `--background-*` — фон;
- `--button-*` и `--states-button-*` — варианты и состояния Button/IconButton;
- `--controls-*` и `--states-controls-*` — состояния Switch;
- `--counter-*` и `--states-counter-*` — Counter;
- `--divider-*` — разделители;
- `--states-text-*` и `--states-icon-*` — disabled/hover-состояния текста и иконок.

### Переопределения поверхностей и контента

| Старое переопределение | Новое переопределение |
| --- | --- |
| `--background-surface-primary` | `--background-primary` |
| `--background-surface-card` | `--background-card` |
| `--background-surface-ground` | `--background-surface` |
| `--background-accent-neutral-fade-secondary` | `--background-tertiary` для form fields |
| `--states-background-disabled-card` | `--states-background-card-disabled` |
| `--stroke-separator-primary` | `--divider-primary` |
| `--icon-quaternary` | `--icon-mute` для Cell и Switch |
| `--icon-contrast-static` | `--icon-primary-inverse-static` |
| `--text-contrast-static` | `--text-primary-inverse-static` |
| `--states-icon-hovered-tertiary` | `--states-icon-tertiary-hover` |
| `--states-text-disabled-primary` | `--states-text-primary-disabled` |
| `--states-text-disabled-themed` | `--states-text-themed-disabled` |
| `--states-text-disabled-negative` | `--states-text-negative-disabled` |

### Button и IconButton

Если приложение переопределяет цвета кнопок, перенесите overrides на компонентные токены:

| Вариант | Фон |
| --- | --- |
| `primary` | `--button-primary` |
| `secondary` | `--button-secondary` |
| `ghost` | `--button-ghost` |
| `primary-contrast` | `--button-primary-contrast` |
| `secondary-contrast` | `--button-secondary-contrast` |
| `overlay` | `--button-overlay` |
| `destructive` | `--button-negative` |

Для состояний используются `--states-button-{variant}-{hover|pressed|disabled}`.

Loading Button не вызывает пользовательский `onClick`. Прежняя цветовая привязка Spinner и Counter внутри вариантов Button сохранена; размер Spinner для Medium изменён с 24 до 20 px.

### Counter

| Старое значение | Новое значение |
| --- | --- |
| `--accent-themed` | `--counter-themed` |
| `--background-accent-contrast-secondary` | `--counter-contrast` |
| `--background-accent-negative` | `--counter-attention` |
| `--background-accent-neutral-default` | `--counter-default` |
| `--background-mute` | `--counter-mute` |
| `--background-menu` | `--counter-menu` |

Counter теперь имеет высоту 20 px и круглый radius. Прежние цвета вариантов `static` и `default` сохранены.

## Изменения компонентов

### Удалённые компоненты

`Dot` и `ToolButton` удалены из публичного API. Вместо `Dot` используйте собственный индикатор или `Counter`, вместо `ToolButton` — `Button` или `IconButton`.

### CellAction

Цвет существующего `mode="primary"` сохранён. Добавлены режимы `secondary` и `themed`; менять существующий JSX не требуется. Текст теперь использует стиль Action Medium, а минимальная ширина компонента составляет 200 px.

### CellSimple

Subtitle по умолчанию сохраняет secondary-цвет. Для менее контрастного варианта доступен новый prop:

```tsx
<CellSimple subtitle="Описание" subtitleMode="tertiary" />
```

CellHeader и placeholder CellInput используют `--text-tertiary`.

### ClearableInput

Внутренняя иконка очистки изменена с Android Close 20 на iOS Close 16.

## Типографика

### CSS-переменные

Шкала типографики приведена к названиям из актуальной Figma Platform collection. Совместимые алиасы не добавляются.

| Было | Стало |
| --- | --- |
| `--size-*` | `--font-size-*` |
| `--height-*` | `--line-height-*` |
| `display` | `hero` |
| `headline-large` | `header` |
| `headline-medium` | `subheader` |
| `headline-small` | `title` |
| `body-large` | `body` |
| `body-medium` | `detail` |
| `body-small` | `description` |
| `label-large` | `label` |
| `label-medium` | `tag` |
| `label-small` | `note` |
| `action-label` | `action-xsmall` |
| `--family-accent` | `--family-headers` |

`--family-base` сохраняется. Android использует `Roboto, sans-serif`; приложение подключает webfont самостоятельно. На iOS `--family-base` и `--family-headers` используют системный Apple stack через `-apple-system`.

### React API

Для нового кода используйте `Typography.Text`:

```diff
- <Typography.Display>Title</Typography.Display>
+ <Typography.Text variant="hero">Title</Typography.Text>

- <Typography.Headline variant="medium">Title</Typography.Headline>
+ <Typography.Text variant="subheader">Title</Typography.Text>

- <Typography.Title variant="large-strong">Text</Typography.Title>
+ <Typography.Text variant="body-strong">Text</Typography.Text>

- <Typography.Label variant="medium">Label</Typography.Label>
+ <Typography.Text variant="tag">Label</Typography.Text>
```

Прежние компоненты Typography пока остаются в публичном API. Сопоставление старой группы Title: `large-strong` → `body-strong`, `medium` → `detail`, `medium-strong` → `detail-strong`, `small` → `description`, `small-strong` → `description-strong`.

Варианты `large-caps` и `small-caps` удалены из `Typography.Label`. Для заголовка группы `CellHeader` используется отдельный стиль `Cell/Label Strong Small Caps`.

## Avatar

### Online status

Для стандартного индикатора онлайна используйте `onlineStatus` вместо удалённого `Dot`:

```diff
- <Avatar.Container size={40} rightBottomCorner={<Avatar.OnlineDot />}>
+ <Avatar.Container size={40} onlineStatus>
    <Avatar.Image src={user.photo} alt={user.name} />
  </Avatar.Container>
```

Индикатор отображается только для круглого Avatar размером от 24 px.

Default-размер Avatar изменён с 48 на 40 px. При зависимости от старого значения укажите `size={48}` явно. Переданное значение ограничивается диапазоном 16–200 px.

## Input

Без `mode` теперь используется `default`. Если в приложении остались значения из старого API, замените их:

```diff
- <Input mode="secondary" />
+ <Input /> (для default)

- <Input mode="primary" />
+ <Input mode="contrast" />
```

Для счётчика доступен `innerClassNames.count`. Hint получает отдельное disabled-состояние.
