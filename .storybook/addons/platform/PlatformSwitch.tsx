import { MobileIcon } from '@storybook/icons';
import * as React from 'react';
import { Button } from 'storybook/internal/components';
import { useGlobals } from 'storybook/manager-api';

import { PARAM_KEY } from './constants';

export const PlatformSwitch = (): React.JSX.Element => {
  const [globals, updateGlobals] = useGlobals();
  const isIos = globals[PARAM_KEY] === 'ios';

  const togglePlatform = React.useCallback(() => {
    updateGlobals({ [PARAM_KEY]: isIos ? 'android' : 'ios' });
  }, [isIos, updateGlobals]);

  const title = isIos ? 'Switch to Android' : 'Switch to iOS';

  return (
    <Button
      active
      key="platform"
      onClick={togglePlatform}
      title={title}
      variant="ghost"
    >
      <MobileIcon />
      &nbsp;
      {globals[PARAM_KEY]}
    </Button>
  );
};
