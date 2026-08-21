# Migration guide: 0.2.1 → 0.3.0

В `0.3.0` цветовые токены и привязки компонентов приведены к актуальной семантике. Старые опубликованные токены пока остаются в палитре для совместимости, но компоненты больше не обязаны использовать их внутри. Если приложение переопределяет CSS-переменные maxUI, обновите такие переопределения по таблицам ниже.

## Цветовые токены

Значения активных токенов Light/Dark синхронизированы с токенами Figma. В частности, изменились значения основных `--text-*` и `--icon-*` токенов, включая `--text-primary`, `--text-secondary`, `--text-tertiary`, `--icon-primary` и `--icon-tertiary`.

Основные новые семантические группы:

- `--background-*` — фон;
- `--button-*` и `--states-button-*` — варианты и состояния Button/IconButton;
- `--controls-*` и `--states-controls-*` — состояния Switch;
- `--counter-*` и `--states-counter-*` — Counter и Dot;
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

Размеры иконок внутри Button теперь фиксированы: 16/20/20/24 px для `xsmall`/`small`/`medium`/`large`. IconButton использует круглый radius и размеры контента 20/24/24/28 px. У stretched Button контент центрируется с учётом боковых элементов.

Loading Button не вызывает пользовательский `onClick`. Прежняя цветовая привязка Spinner и Counter внутри вариантов Button сохранена; размер Spinner для Medium изменён с 24 до 20 px.

### Counter и Dot

| Старое значение | Новое значение |
| --- | --- |
| `--accent-themed` | `--counter-themed` |
| `--background-accent-contrast-secondary` | `--counter-contrast` |
| `--background-accent-negative` | `--counter-attention` |
| `--background-accent-neutral-default` | `--counter-default` |
| `--background-mute` | `--counter-mute` |
| `--background-menu` | `--counter-menu` |

Counter теперь имеет высоту 20 px и круглый radius. Прежние цвета вариантов `static` и `default` сохранены. Dot с `appearance="themed"` использует `--counter-themed`; для `appearance="inherit"` по-прежнему доступен `--MaxUi-external_background`.

## Изменения компонентов

### CellAction

Цвет существующего `mode="primary"` сохранён. Добавлены режимы `secondary` и `themed`; менять существующий JSX не требуется. Текст теперь использует стиль Action Medium, а минимальная ширина компонента составляет 200 px.

### CellSimple

Subtitle по умолчанию сохраняет secondary-цвет. Для менее контрастного варианта доступен новый prop:

```tsx
<CellSimple subtitle="Описание" subtitleMode="tertiary" />
```

Добавлена поддержка файлового контента:

```tsx
<CellSimple
  fileName="video_clip"
  fileExtension="mp4"
  fileDetail="06.10.2025 в 16:12 · 2,4 МБ"
/>
```

Для стилизации доступны `innerClassNames.fileName`, `fileExtension` и `fileDetail`. У chevron удалён прежний внутренний отступ.
CellHeader и placeholder CellInput используют `--text-tertiary`.

### ClearableInput

Внутренняя иконка очистки изменена с Android Close 20 на iOS Close 16.
