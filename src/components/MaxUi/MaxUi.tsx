import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, useMemo } from 'react';

import { isIos } from '../../helpers';
import { useSystemColorScheme } from '../../hooks';
import styles from './MaxUi.module.scss';
import { MaxUiContext, type MaxUiContextInterface } from './MaxUiContext';

export interface MaxUiProps extends Partial<MaxUiContextInterface> {
  children: ComponentProps<'div'>['children']

  className?: ComponentProps<'div'>['className']
}

export const MaxUi = forwardRef<HTMLDivElement, MaxUiProps>((props, ref) => {
  const {
    children,
    className,
    colorScheme: colorSchemeProp,
    platform = isIos() ? 'ios' : 'android'
  } = props;

  const systemColorScheme = useSystemColorScheme({
    listenChanges: !colorSchemeProp
  });
  const colorScheme = colorSchemeProp ?? systemColorScheme;

  const config = useMemo<MaxUiContextInterface>(() => ({
    colorScheme,
    platform
  }), []);

  const rootClassName = clsx(
    styles.MaxUi,
    styles[`MaxUi_colorScheme_${colorScheme}`],
    styles[`MaxUi_platform_${platform}`],
    className
  );

  return (
    <MaxUiContext.Provider value={config}>
      <div ref={ref} className={rootClassName}>
        {children}
      </div>
    </MaxUiContext.Provider>
  );
});

MaxUi.displayName = 'MaxUi';
