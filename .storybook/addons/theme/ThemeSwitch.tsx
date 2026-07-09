import { MoonIcon, SunIcon } from '@storybook/icons';
import * as React from 'react';
import { Button } from 'storybook/internal/components';
import { useGlobals } from 'storybook/manager-api';

import { PARAM_KEY } from './constants';

export const ThemeSwitch = (): React.JSX.Element => {
  const [globals, updateGlobals] = useGlobals();
  const isDark = globals[PARAM_KEY] === 'dark';

  const toggleTheme = React.useCallback(() => {
    updateGlobals({ [PARAM_KEY]: isDark ? 'light' : 'dark' });
  }, [isDark, updateGlobals]);

  const title = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <Button
      active
      key="theme"
      onClick={toggleTheme}
      title={title}
      variant="ghost"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      &nbsp;
      {globals[PARAM_KEY]}
    </Button>
  );
};
