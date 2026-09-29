import { clsx } from 'clsx';
import { type CSSProperties } from 'react';

import styles from './Snackbar.module.scss';
import { SnackbarItem, type SnackbarItemProps } from './SnackbarItem';
import type {
  SnackbarOffset,
  SnackbarPlacement,
  SnackbarQueueItem
} from './types';

export interface SnackbarContainerProps {
  queue: SnackbarQueueItem[];
  onExited?: SnackbarItemProps['onExited'];
}

const placements: SnackbarPlacement[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
];

const placementClassNames: Record<SnackbarPlacement, string> = {
  'top-left': styles.topLeft,
  'top-center': styles.topCenter,
  'top-right': styles.topRight,
  'bottom-left': styles.bottomLeft,
  'bottom-center': styles.bottomCenter,
  'bottom-right': styles.bottomRight
};

type SnackbarViewportStyle = CSSProperties & {
  '--snackbar-bottom-offset'?: string;
  '--snackbar-top-offset'?: string;
};

interface SnackbarViewportGroup {
  key: string;
  items: SnackbarQueueItem[];
  offsetValue: string | undefined;
  placement: SnackbarPlacement;
}

const normalizeOffset = (offset?: SnackbarOffset): string | undefined => {
  if (offset === undefined) return undefined;
  return typeof offset === 'number' ? `${offset}px` : offset;
};

const groupByViewport = (queue: SnackbarQueueItem[]): SnackbarViewportGroup[] =>
  placements.flatMap((placement) => {
    const groups = new Map<string, SnackbarViewportGroup>();

    for (const item of queue) {
      if (item.placement !== placement) continue;

      const offsetValue = normalizeOffset(item.offset);
      const key = `${placement}:${offsetValue === undefined ? 'default' : `offset:${offsetValue}`}`;
      const group = groups.get(key);

      if (group) {
        group.items.push(item);
      } else {
        groups.set(key, {
          key,
          items: [item],
          offsetValue,
          placement
        });
      }
    }

    return [...groups.values()];
  });

const getViewportStyle = (
  placement: SnackbarPlacement,
  offsetValue?: string
): SnackbarViewportStyle | undefined => {
  if (offsetValue === undefined) return undefined;

  return placement.startsWith('top-')
    ? { '--snackbar-top-offset': offsetValue }
    : { '--snackbar-bottom-offset': offsetValue };
};

export function SnackbarContainer({ queue, onExited }: SnackbarContainerProps) {
  const viewportGroups = groupByViewport(queue);

  return (
    <>
      {viewportGroups.map(({ key, items, offsetValue, placement }) => (
        <div
          key={key}
          className={clsx(styles.viewport, placementClassNames[placement])}
          aria-label={`Уведомления: ${placement}`}
          aria-live="polite"
          data-offset={offsetValue}
          data-placement={placement}
          role="region"
          style={getViewportStyle(placement, offsetValue)}
        >
          {items.map((item) => (
            <SnackbarItem
              key={item.id}
              {...item}
              onExited={onExited}
            />
          ))}
        </div>
      ))}
    </>
  );
}
