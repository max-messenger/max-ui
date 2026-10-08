import clsx from 'clsx';
import { AnimationEvent,type ReactNode, useEffect, useState } from 'react';

import { Typography } from '../Typography';
import styles from './BottomSheet.module.scss';

export type BottomSheetProps = {
  open: boolean
  title?: string
  onClose: () => void
  children: ReactNode
  /**
   * Минимальная высота шторки в vh
   */
  minHeight?: number
}

export const BottomSheet = ({
  open, title, onClose, children, minHeight
}: BottomSheetProps) => {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
    }
  }, [open]);

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (closing && event.target === event.currentTarget) {
      setMounted(false);
      setClosing(false);
    }
  };

  useEffect(() => {
    if (!mounted) {
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
  }, [mounted, onClose]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={clsx(styles.overlay, {[styles.overlayClosing]: closing})}
      onClick={onClose}
    >
      <div
        className={clsx(styles.sheet, {[styles.sheetClosing]: closing})}
        style={{ minHeight: minHeight ? `${minHeight}vh` : 'auto' }}
        onClick={event => event.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={styles.handle} />
        {title && (
          <div className={styles.header}>
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
