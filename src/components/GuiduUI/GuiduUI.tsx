import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useEffect, useMemo } from 'react';

import { isIos } from '../../helpers';
import { useSystemColorScheme } from '../../hooks';
import styles from './GuiduUI.module.scss';
import { GuiduUIContext, type GuiduUIContextInterface } from './GuiduUIContext';

export interface GuiduUIProps extends Partial<GuiduUIContextInterface> {
  children: ComponentProps<'div'>['children']
  className?: ComponentProps<'div'>['className']
  resetBody?: boolean
}

export const GuiduUI = forwardRef<HTMLDivElement, GuiduUIProps>((props, ref) => {
  const {
    children,
    className,
    colorScheme: colorSchemeProp,
    platform = isIos() ? 'ios' : 'android',
    resetBody = false
  } = props;

  const systemColorScheme = useSystemColorScheme({
    listenChanges: !colorSchemeProp
  });
  const colorScheme = colorSchemeProp ?? systemColorScheme;

  const config = useMemo<GuiduUIContextInterface>(() => ({
    colorScheme,
    platform
  }), [colorScheme, platform]);

  useEffect(() => {
    if (!resetBody) return;

    document.body.classList.add(styles.GuiduUI_resetBody);

    return () => {
      document.body.classList.remove(styles.GuiduUI_resetBody);
    };
  }, [resetBody]);

  const rootClassName = clsx(
    styles.GuiduUI,
    styles[`GuiduUI_colorScheme_${colorScheme}`],
    styles[`GuiduUI_platform_${platform}`],
    className
  );

  return (
    <GuiduUIContext.Provider value={config}>
      <div ref={ref} className={rootClassName}>
        {children}
      </div>
    </GuiduUIContext.Provider>
  );
});

GuiduUI.displayName = 'GuiduUI';
