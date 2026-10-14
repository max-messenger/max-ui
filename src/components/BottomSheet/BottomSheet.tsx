import clsx from 'clsx';
import {CSSProperties, type ReactNode, type TransitionEvent, useEffect, useState} from 'react';

import { useDrag } from '../../hooks';
import {InnerClassNamesProp} from "../../types";
import { Typography } from '../Typography';
import styles from './BottomSheet.module.scss';

export type BottomSheetProps = {
  open: boolean
  title?: string
  onClose: () => void
  children: ReactNode
  /**
   * Минимальная высота шторки
   */
  minHeight?: CSSProperties['minHeight'];
  innerClassNames?: InnerClassNamesProp<'overlay' | 'sheet' | 'handle' | 'header'>
  enableDrag?: boolean
}

type Status = 'closed' | 'open' | 'exiting';

export const BottomSheet = ({
  open, title, onClose, children, minHeight = 'auto', innerClassNames, enableDrag = true
}: BottomSheetProps) => {
  const [status, setStatus] = useState<Status>(open ? 'open' : 'closed');

  useEffect(() => {
    setStatus((prev) => {
      if (open) {
        return 'open';
      }
      return prev === 'closed' ? 'closed' : 'exiting';
    });
  }, [open]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') {
      return;
    }
    // По завершении transition выхода размонтируем шторку.
    setStatus((prev) => (prev === 'exiting' ? 'closed' : prev));
  };

  // Блокируем прокрутку фона, пока шторка в DOM.
  useEffect(() => {
    if (status === 'closed') {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [status]);

  useEffect(() => {
    if (status === 'closed') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [status, onClose]);

  const {
    dragging,
    dragOffset,
    suppressClickRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  } = useDrag({
    enabled: enableDrag && status === 'open',
    onClose: () => {
      setStatus('exiting');
      onClose();
    }
  });

  const handleOverlayClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    onClose();
  };

  if (status === 'closed') {
    return null;
  }

  const exiting = status === 'exiting';
  const transform = dragging
    ? `translateY(${dragOffset}px)`
    : `translateY(${exiting ? 100 : 0}%)`;

  return (
    <div
      className={clsx(styles.overlay, { [styles.overlayClosing]: exiting }, innerClassNames?.overlay)}
      onClick={handleOverlayClick}
    >
      <div
        className={clsx(
          styles.sheet,
          innerClassNames?.sheet,
          { [styles.sheet_dragging]: dragging, [styles.sheet_exiting]: exiting }
        )}
        style={{
          minHeight,
          transform,
        }}
        onClick={event => event.stopPropagation()}
        onTransitionEnd={handleTransitionEnd}
      >
        {enableDrag && (
          <div
            className={clsx(styles.handle, innerClassNames?.handle)}
            role="button"
            tabIndex={0}
            aria-label="Перетащите вниз, чтобы закрыть"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClose();
              }
            }}
          />
        )}
        {title && (
          <div className={clsx(styles.header, innerClassNames?.header)}>
            <Typography.Title variant="medium-strong">
              {title}
            </Typography.Title>
          </div>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
