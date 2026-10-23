import clsx from "clsx";
import {forwardRef, useLayoutEffect, useRef, useState} from "react";

import {Icon16Info} from "../../icons";
import type {InnerClassNamesProp} from "../../types";
import {IconButton, IconButtonProps} from "../IconButton";
import { Typography } from "../Typography";
import styles from "./Tooltip.module.scss";

const MAX_WIDTH = 280;
const EDGE_GAP = 16;
const OFFSET = 4;
const CLOSE_DELAY_MS = 150;

export type TooltipInnerElementKey = 'root' | 'trigger' | 'tooltip'

export interface TooltipProps extends Pick<IconButtonProps, 'variant'>{
  label: string
  text: string
  innerClassNames?: InnerClassNamesProp<TooltipInnerElementKey>
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(({label, text, variant = 'ghost'}, forwardRef) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const clearCloseTimer = () => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = undefined;
  };

  const close = () => {
    clearCloseTimer();
    setIsOpen(false);
  };

  const handlePointerEnter = () => {
    setIsOpen(true);
    clearCloseTimer();
  };
  const handlePointerLeave = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(close, CLOSE_DELAY_MS);
  };

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!isOpen || !trigger || !tooltip) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const width = Math.min(MAX_WIDTH, window.innerWidth - EDGE_GAP * 2);
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - width / 2, EDGE_GAP),
      window.innerWidth - EDGE_GAP - width
    );
    const height = tooltip.offsetHeight;
    const below = rect.bottom + OFFSET;
    const top = below + height > window.innerHeight - EDGE_GAP
      ? Math.max(rect.top - OFFSET - height, EDGE_GAP)
      : below;

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }, [isOpen]);

  return (
    <span
      className={styles.root}
      ref={forwardRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <IconButton
        ref={triggerRef}
        type="button"
        size='xsmall'
        variant={variant}
        className={styles.trigger}
        aria-label={`Описание: ${label}`}
      >
        <Icon16Info />
      </IconButton>
      <div
        ref={tooltipRef}
        role="tooltip"
        className={clsx(styles.tooltip, {[styles.tooltip_open]: isOpen})}
      >
        <Typography.Body variant="small">{text}</Typography.Body>
      </div>
    </span>
  );
});

Tooltip.displayName = "Tooltip";
