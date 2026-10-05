import { type Placement } from '@floating-ui/react';
import { type MouseEvent, type ReactNode } from 'react';

import { type AsChildProp, type InnerClassNamesProp } from '../../types';

export type ContextMenuOpenOn = 'click' | 'hover';

export type ContextMenuMode = 'auto' | 'desktop' | 'mobile';

export type ContextMenuResolvedMode = 'desktop' | 'mobile';

export type ContextMenuItemMode = 'default' | 'destructive';

export type ContextMenuInnerElementKey =
  | 'trigger'
  | 'content'
  | 'actionBar'
  | 'actionBarButton'
  | 'actionBarButtonIcon'
  | 'actionBarButtonLabel'
  | 'list'
  | 'row'
  | 'before'
  | 'label'
  | 'hint'
  | 'chevron'
  | 'accordion'
  | 'divider';

/** Кнопка Action bar — опциональной панели сверху меню */
export interface ContextMenuActionButton {
  id: string
  icon: ReactNode
  /** Подпись под иконкой, необязательная */
  label?: ReactNode
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

/** По спеке в Action bar может быть только 2 или 3 кнопки, меньше двух — нельзя */
export type ContextMenuActionBar =
  | [ContextMenuActionButton, ContextMenuActionButton]
  | [ContextMenuActionButton, ContextMenuActionButton, ContextMenuActionButton];

interface ContextMenuItemBase {
  /** Уникальный идентификатор пункта */
  id: string
  /** Основной текст пункта */
  label: ReactNode
  /** Слот слева (иконка и любой другой контент) */
  before?: ReactNode
  /**
   * Зарезервировать место под иконку слева, когда `before` не задан.
   * Используется, если у большинства пунктов меню есть иконки — так текст остаётся на одной оси.
   */
  offset?: boolean
  /** Разделитель над пунктом (группировка пунктов); перед первой строкой не рисуется */
  divider?: boolean
  /** 'destructive' — красный текст пункта */
  mode?: ContextMenuItemMode
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

/** Обычный пункт: справа может быть вспомогательный контент (например, хоткей) */
export interface ContextMenuItemAction extends ContextMenuItemBase {
  hint?: ReactNode
  items?: undefined
}

/** Вложенный пункт: справа автоматически рисуется Chevron, вспомогательный текст не предусмотрен */
export interface ContextMenuItemNested extends ContextMenuItemBase {
  /** Вложенное подменю, глубина не ограничена */
  items: ContextMenuItem[]
  hint?: undefined
}

export type ContextMenuItem = ContextMenuItemAction | ContextMenuItemNested;

export interface ContextMenuProps extends AsChildProp {
  /** Пункты меню */
  items: ContextMenuItem[]
  /** Action bar сверху меню: 2–3 кнопки, Divider после него добавляется автоматически */
  actionBar?: ContextMenuActionBar
  /** Элемент, по которому открывается меню (кнопка, объект, выделенный текст и т.д.) */
  children: ReactNode
  /** Способ открытия меню; можно передать оба значения сразу. Default: 'click' */
  openOn?: ContextMenuOpenOn | ContextMenuOpenOn[]
  /**
   * 'desktop' — вложенные меню открываются рядом при наведении;
   * 'mobile' — вложенные меню раскрываются аккордеоном внутри основного;
   * 'auto' — определяется по типу указателя (matchMedia '(pointer: coarse)'). Default: 'auto'
   */
  mode?: ContextMenuMode
  /** Расположение корневого меню относительно триггера; при нехватке места переворачивается. Default: 'bottom-start' */
  placement?: Placement
  /** Controlled-состояние открытости */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Класс триггера (обёртки, если не используется asChild) */
  className?: string
  innerClassNames?: InnerClassNamesProp<ContextMenuInnerElementKey>
}
