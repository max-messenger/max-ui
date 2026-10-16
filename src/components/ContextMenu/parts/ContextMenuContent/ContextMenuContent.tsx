import { clsx } from 'clsx';
import { forwardRef, type HTMLAttributes } from 'react';

import guiduUiStyles from '../../../GuiduUI/GuiduUI.module.scss';
import { useAppearance } from '../../../GuiduUI/GuiduUIContext';
import styles from './ContextMenuContent.module.scss';

export type ContextMenuContentProps = HTMLAttributes<HTMLDivElement>;

// Панель меню рендерится через портал в document.body и выпадает из области токенов корня GuiduUI,
// поэтому палитра и платформенные классы GuiduUI применяются к панели повторно — так цвета,
// размеры и типографика (включая тёмную тему) работают внутри портала
export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>((props, forwardedRef) => {
  const { children, className, ...rest } = props;

  const { platform, colorScheme } = useAppearance();

  return (
    <div
      ref={forwardedRef}
      role="menu"
      className={clsx(
        guiduUiStyles[`GuiduUI_colorScheme_${colorScheme}`],
        guiduUiStyles[`GuiduUI_platform_${platform}`],
        styles.ContextMenuContent,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

ContextMenuContent.displayName = 'ContextMenuContent';
