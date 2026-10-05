import {clsx} from "clsx";
import {KeyboardEventHandler, MouseEventHandler} from "react";

import type {InnerClassNamesProp} from "../../types";
import styles from "./Segmented.module.scss";

export type SegmentedElementKey = 'list' | 'item';
export interface SegmentedItem {
  id: string;
  title: string;
}
export interface SegmentedProps {
  items: SegmentedItem[],
  activeItem: string,
  onClick: (id: string) => void,
  innerClassNames?: InnerClassNamesProp<SegmentedElementKey>
}

export const Segmented = ({items, activeItem, onClick, innerClassNames}: SegmentedProps) => {
  const handleClick = (itemId: string): MouseEventHandler<HTMLButtonElement> => (event) => {
    onClick(itemId);
    event.currentTarget.scrollIntoView({inline: 'nearest', block: 'nearest', behavior: 'smooth'});
  };

  const onKeyDown = (index: number): KeyboardEventHandler<HTMLButtonElement> => (event) => {
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
    <div className={clsx(styles.segmented, innerClassNames?.list)} role="tablist">
      {items.map((item, index) => (
        <button
          key={item.id}
          role="tab"
          tabIndex={isActive(item.id) ? 0 : -1}
          aria-selected={isActive(item.id)}
          onKeyDown={onKeyDown(index)}
          className={clsx(styles.segment, innerClassNames?.item, {[styles.segment_active]: isActive(item.id) })}
          onClick={handleClick(item.id)}
          type="button"
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};
