import {clsx} from "clsx";
import {KeyboardEventHandler, MouseEventHandler} from "react";

import {Icon16CloseIos} from "../../icons";
import {SvgButton} from "../../internal";
import type {InnerClassNamesProp} from "../../types";
import {Counter} from "../Counter";
import styles from "./Tabs.module.scss";

export type TabsElementKey = 'list' | 'item' | 'indicator' | 'closeButton';
export interface TabsItem {
  id: string;
  title: string;
  indicator?: number,
}
export interface TabsProps {
  items: TabsItem[],
  activeItem: string,
  onClick: (id: string) => void,
  onCancel?: (id: string) => void,
  innerClassNames?: InnerClassNamesProp<TabsElementKey>
}

export const Tabs = ({items, activeItem, onCancel, onClick, innerClassNames}: TabsProps) => {
  const handleClose = (itemId: string): MouseEventHandler<HTMLButtonElement> => (event) => {
    event.stopPropagation();
    onCancel?.(itemId);
  };
  const handleClick = (itemId: string): MouseEventHandler<HTMLDivElement> => (event) => {
    onClick(itemId);
    event.currentTarget.scrollIntoView({inline: 'nearest', block: 'nearest', behavior: 'smooth'});
  };

  const onKeyDown = (index: number): KeyboardEventHandler<HTMLDivElement> => (event) => {
    const last = items.length - 1;
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = index === last ? 0 : index + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = index === 0 ? last : index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onClick(items[index].id);
        return;
      default:
        return;
    }
    event.preventDefault();
    onClick(items[next].id);
    const nextEl = event.currentTarget.parentElement?.children[next] as HTMLElement | undefined;
    nextEl?.focus();
    nextEl?.scrollIntoView({inline: 'nearest', block: 'nearest', behavior: 'smooth'});
  };
  const isActive = (id: string): boolean => id === activeItem;

  return (
    <div className={clsx(styles.tabs, innerClassNames?.list)} role="tablist">
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tab"
          tabIndex={isActive(item.id) ? 0 : -1}
          aria-selected={isActive(item.id)}
          onKeyDown={onKeyDown(index)}
          className={clsx(styles.tab, innerClassNames?.item, {[styles.tab_active]: isActive(item.id) })}
          onClick={handleClick(item.id)}
        >
          <button
            type="button"
            tabIndex={-1}
            className={styles.tab__label}
          >
            {item.title}
            {item.indicator && <Counter variant={isActive(item.id) ? 'primary' : 'mute'} value={item.indicator} className={clsx(innerClassNames?.indicator)} />}
          </button>
          {!!onCancel && !item.indicator && (
            <SvgButton
              type="button"
              tabIndex={-1}
              className={clsx(innerClassNames?.closeButton)}
              onClick={handleClose(item.id)}
              aria-label="Close"
            >
              <Icon16CloseIos />
            </SvgButton>
          )}
        </div>
      ))}
    </div>
  );
};
