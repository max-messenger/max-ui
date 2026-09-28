import { type PropsWithChildren,useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SnackbarContext } from "./context";
import { SnackbarContainer } from './SnackbarContainer';
import {
  type CloseSnackbarCallback,
  type ShowSnackbarCallback,
  type SnackbarContextValue,
  type SnackbarPlacement,
  type SnackbarQueueItem} from './types';

const DEFAULT_SNACKBAR_DURATION = 5000;

let fallbackId = 0;
const createDefaultId = (): string => {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID();
  fallbackId += 1;
  return `snackbar-${Date.now()}-${fallbackId}`;
};

export interface SnackbarProviderProps extends PropsWithChildren {
  /** Максимум одновременно видимых уведомлений в каждой позиции */
  queueSize?: number;
  createId?: () => string;
  defaultPlacement?: SnackbarPlacement;
}

export function SnackbarProvider({
  children,
  queueSize = 3,
  createId = createDefaultId,
  defaultPlacement = 'bottom-center'
}: SnackbarProviderProps) {
  const [queue, setQueue] = useState<SnackbarQueueItem[]>([]);
  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const showSnackbar: ShowSnackbarCallback = useCallback(
    (params) => {
      const id = params.id ?? createId();
      setQueue((previous) => {
        if (previous.some((item) => item.id === id)) return previous;
        return [
          ...previous,
          { ...params, id, placement: params.placement ?? defaultPlacement, leaving: false }
        ];
      });
    },
    [createId, defaultPlacement]
  );

  const closeSnackbar = useCallback<CloseSnackbarCallback>((id) => {
    const timer = timersRef.current.get(id);
    if (timer) clearTimeout(timer);
    timersRef.current.delete(id);
    setQueue((previous) =>
      previous.map((item) => (item.id === id ? { ...item, leaving: true } : item))
    );
  }, []);

  const removeSnackbar = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) clearTimeout(timer);
    timersRef.current.delete(id);
    setQueue((previous) => previous.filter((item) => item.id !== id));
  }, []);

  const visibleQueue = useMemo(() => {
    const placementCounts = new Map<SnackbarPlacement, number>();
    const limit = Math.max(0, queueSize);

    return queue.filter((item) => {
      // Уходящие элементы остаются в DOM до конца анимации и не считаются против лимита
      if (item.leaving) return true;

      const count = placementCounts.get(item.placement) ?? 0;
      if (count >= limit) return false;
      placementCounts.set(item.placement, count + 1);
      return true;
    });
  }, [queue, queueSize]);

  useEffect(() => {
    const queuedIds = new Set(queue.map((item) => item.id));
    for (const [id, timer] of timersRef.current) {
      if (!queuedIds.has(id)) {
        clearTimeout(timer);
        timersRef.current.delete(id);
      }
    }

    for (const item of visibleQueue) {
      if (item.leaving) continue;
      if (timersRef.current.has(item.id)) continue;
      const timer = setTimeout(
        () => closeSnackbar(item.id),
        item.duration ?? DEFAULT_SNACKBAR_DURATION
      );
      timersRef.current.set(item.id, timer);
    }
  }, [closeSnackbar, queue, visibleQueue]);

  useEffect(
    () => () => {
      for (const timer of timersRef.current.values()) clearTimeout(timer);
      timersRef.current.clear();
    },
    []
  );

  const value = useMemo<SnackbarContextValue>(
    () => ({ showSnackbar, closeSnackbar }),
    [closeSnackbar, showSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <SnackbarContainer queue={visibleQueue} onExited={removeSnackbar} />
    </SnackbarContext.Provider>
  );
}
