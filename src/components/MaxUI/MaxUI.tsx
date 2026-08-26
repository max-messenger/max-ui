import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useEffect, useMemo } from 'react';

import { isIos } from '../../helpers';
import { useSystemColorScheme } from '../../hooks';
import styles from './MaxUI.module.scss';
import { MaxUIContext, type MaxUIContextInterface } from './MaxUIContext';

export interface MaxUIProps extends Partial<MaxUIContextInterface> {
  children: ComponentProps<'div'>['children']
  className?: ComponentProps<'div'>['className']
  resetBody?: boolean
}

export const MaxUI = forwardRef<HTMLDivElement, MaxUIProps>((props, ref) => {
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

  const config = useMemo<MaxUIContextInterface>(() => ({
    colorScheme,
    platform
  }), [colorScheme, platform]);

  useEffect(() => {
    if (!resetBody) return;

    document.body.classList.add(styles.MaxUI_resetBody);

    return () => {
      document.body.classList.remove(styles.MaxUI_resetBody);
    };
  }, [resetBody]);

  const rootClassName = clsx(
    styles.MaxUI,
    styles[`MaxUI_colorScheme_${colorScheme}`],
    styles[`MaxUI_platform_${platform}`],
    className
  );

  return (
    <MaxUIContext.Provider value={config}>
      <div ref={ref} className={rootClassName}>
        {children}
      </div>
    </MaxUIContext.Provider>
  );
});

MaxUI.displayName = 'MaxUI';
