import { addons, types } from 'storybook/manager-api';

import { ADDON_ID } from './constants';
import { PlatformSwitch } from './PlatformSwitch';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Platform',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode?.match(/^(story|docs)$/) != null,
    render: PlatformSwitch
  });
});
