import { clsx } from 'clsx';
import { Fragment, type MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import { useContextMenu } from '../../context';
import { SUBMENU_CLOSE_DELAY, SUBMENU_OPEN_DELAY } from '../../helpers';
import { type ContextMenuItem, type ContextMenuItemNested } from '../../types';
import { ContextMenuDivider } from '../ContextMenuDivider';
import { ContextMenuRow } from '../ContextMenuRow';
import { ContextMenuSubmenu } from '../ContextMenuSubmenu';
import styles from './ContextMenuList.module.scss';

export interface ContextMenuListProps {
  items: ContextMenuItem[]
  /** Вложенный уровень мобильного аккордеона — добавляет отступ слева */
  nested?: boolean
}

export const ContextMenuList = ({ items, nested = false }: ContextMenuListProps) => {
  const { mode, close, innerClassNames } = useContextMenu();

  // Desktop: на уровне открыто не более одного подменю, открытие/закрытие по hover с задержками
  const [openChildId, setOpenChildId] = useState<string | null>(null);
  const openTimerRef = useRef<number | undefined>(undefined);
  const closeTimerRef = useRef<number | undefined>(undefined);

  // Mobile: аккордеон — раскрыто может быть несколько веток сразу
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      window.clearTimeout(openTimerRef.current);
      window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleNestedMouseEnter = useCallback((id: string) => {
    window.clearTimeout(closeTimerRef.current);
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      setOpenChildId(id);
    }, SUBMENU_OPEN_DELAY);
  }, []);

  const handleNestedMouseLeave = useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setOpenChildId(null);
    }, SUBMENU_CLOSE_DELAY);
  }, []);

  const handlePanelMouseEnter = useCallback(() => {
    window.clearTimeout(closeTimerRef.current);
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  }, []);

  const handleLeafClick = useCallback((item: ContextMenuItem) => (event: MouseEvent<HTMLElement>) => {
    item.onClick?.(event);
    close();
  }, [close]);

  const handleNestedClick = useCallback((item: ContextMenuItemNested) => (event: MouseEvent<HTMLElement>) => {
    item.onClick?.(event);

    if (mode === 'mobile') {
      toggleExpanded(item.id);
      return;
    }

    // Desktop: клик по строке с подменю тоже переключает его (например, для тачпада)
    window.clearTimeout(openTimerRef.current);
    window.clearTimeout(closeTimerRef.current);
    setOpenChildId((prev) => (prev === item.id ? null : item.id));
  }, [mode, toggleExpanded]);

  return (
    <div
      role="none"
      className={clsx(
        styles.ContextMenuList,
        { [styles.ContextMenuList_nested]: nested },
        innerClassNames?.list
      )}
    >
      {items.map((item, index) => {
        const hasSubmenu = item.items !== undefined;
        const showDivider = Boolean(item.divider) && index > 0;
        const divider = showDivider && <ContextMenuDivider className={clsx(innerClassNames?.divider)} />;

        if (hasSubmenu && mode === 'desktop') {
          return (
            <Fragment key={item.id}>
              {divider}
              <ContextMenuSubmenu
                item={item}
                open={openChildId === item.id}
                onClick={handleNestedClick(item)}
                onRowMouseEnter={handleNestedMouseEnter}
                onRowMouseLeave={handleNestedMouseLeave}
                onPanelMouseEnter={handlePanelMouseEnter}
                onPanelMouseLeave={handleNestedMouseLeave}
              >
                <ContextMenuList items={item.items} />
              </ContextMenuSubmenu>
            </Fragment>
          );
        }

        const isAccordionItem = hasSubmenu && mode === 'mobile';
        const expanded = isAccordionItem && expandedIds.includes(item.id);

        return (
          <Fragment key={item.id}>
            {divider}

            <ContextMenuRow
              item={item}
              expanded={expanded}
              onClick={hasSubmenu ? handleNestedClick(item) : handleLeafClick(item)}
            />

            {isAccordionItem && (
              <div
                role="none"
                className={clsx(
                  styles.ContextMenuList__accordion,
                  { [styles.ContextMenuList__accordion_expanded]: expanded },
                  innerClassNames?.accordion
                )}
              >
                <div className={styles.ContextMenuList__accordionContent}>
                  <ContextMenuList items={item.items} nested />
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

ContextMenuList.displayName = 'ContextMenuList';
