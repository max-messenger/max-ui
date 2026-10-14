import { type PointerEvent, type RefObject, useRef, useState } from 'react';

/** Порог смещения (в px), при превышении которого шторка закрывается по отпусканию. */
const DEFAULT_CLOSE_THRESHOLD = 80;
/** Небольшое смещение, после которого жест считается перетаскиванием (для подавления клика). */
const DEFAULT_MOVE_THRESHOLD = 5;

export type UseDragOptions = {
  /** Перетаскивание разрешено, только пока шторка полностью открыта и не закрывается. */
  enabled: boolean
  /** Вызывается, когда по отпусканию смещение превысило порог закрытия. */
  onClose: () => void
  /** Порог закрытия в пикселях. */
  closeThreshold?: number
  /** Порог распознавания жеста как перетаскивания в пикселях. */
  moveThreshold?: number
}

export type UseDragResult = {
  /** Идёт ли активное перетаскивание (отключает анимацию transform). */
  dragging: boolean
  /** Текущее смещение в пикселях. */
  dragOffset: number
  /** Поднимается в true после перетаскивания, чтобы подавить следующий клик по оверлею. */
  suppressClickRef: RefObject<boolean>
  handlePointerDown: (event: PointerEvent<HTMLDivElement>) => void
  handlePointerMove: (event: PointerEvent<HTMLDivElement>) => void
  handlePointerUp: (event: PointerEvent<HTMLDivElement>) => void
  handlePointerCancel: (event: PointerEvent<HTMLDivElement>) => void
}

/**
 * Хук для управления перетаскиванием
 */
export const useDrag = ({
  enabled,
  onClose,
  closeThreshold = DEFAULT_CLOSE_THRESHOLD,
  moveThreshold = DEFAULT_MOVE_THRESHOLD
}: UseDragOptions): UseDragResult => {
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const dragStartYRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const suppressClickRef = useRef(false);

  // Актуальное значение enabled берётся из ref, чтобы обработчики pointer
  // не опирались на устаревшее замыкание.
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabledRef.current) {
      return;
    }
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }
    dragStartYRef.current = event.clientY;
    movedRef.current = false;
    draggingRef.current = true;
    dragOffsetRef.current = 0;
    setDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) {
      return;
    }
    const offset = Math.max(0, event.clientY - dragStartYRef.current);
    dragOffsetRef.current = offset;
    if (offset > moveThreshold) {
      movedRef.current = true;
    }
    setDragOffset(offset);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) {
      return;
    }
    draggingRef.current = false;
    const offset = dragOffsetRef.current;
    setDragging(false);
    if (movedRef.current) {
      suppressClickRef.current = true;
    }
    if (offset > closeThreshold) {
      onCloseRef.current();
    }
    setDragOffset(0);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return {
    dragging,
    dragOffset,
    suppressClickRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp: endDrag,
    handlePointerCancel: endDrag
  };
};
