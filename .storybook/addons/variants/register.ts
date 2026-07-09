import { addons, types } from 'storybook/manager-api';

import { ADDON_ID, PARAM_KEY, TOOL_ID } from './constants';
import { Tool } from './Tool';

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    match: ({ viewMode }) => viewMode?.match(/^(story|docs)$/) != null,
    paramKey: PARAM_KEY,
    render: Tool,
    title: 'Component Variants',
    type: types.TOOL
  });
});
