import { clsx } from 'clsx';
import { forwardRef, type HTMLAttributes } from 'react';

import maxUiStyles from '../../../MaxUI/MaxUI.module.scss';
import { useAppearance } from '../../../MaxUI/MaxUIContext';
import styles from './ContextMenuContent.module.scss';

export type ContextMenuContentProps = HTMLAttributes<HTMLDivElement>;

// Панель меню рендерится через портал в document.body и выпадает из области токенов корня MaxUI,
// поэтому палитра и платформенные классы MaxUI применяются к панели повторно — так цвета,
// размеры и типографика (включая тёмную тему) работают внутри портала
export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>((props, forwardedRef) => {
  const { children, className, ...rest } = props;

  const { platform, colorScheme } = useAppearance();

  return (
    <div
      ref={forwardedRef}
      role="menu"
      className={clsx(
        maxUiStyles[`MaxUI_colorScheme_${colorScheme}`],
        maxUiStyles[`MaxUI_platform_${platform}`],
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
