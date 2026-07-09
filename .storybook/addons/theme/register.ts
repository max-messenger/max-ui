import { addons, types } from 'storybook/manager-api';

import { ADDON_ID } from './constants';
import { ThemeSwitch } from './ThemeSwitch';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Theme',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode?.match(/^(story|docs)$/) != null,
    render: ThemeSwitch
  });
});
