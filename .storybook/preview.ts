import type { Preview } from '@storybook/react-vite';

import { withCartesian, withConfigProvider } from './decorators';

const preview: Preview = {
  parameters: {
    backgrounds: { disabled: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'fullscreen'
  },
  // tags: ['autodocs'],
  decorators: [withCartesian, withConfigProvider],
  initialGlobals: {
    cartesian: null,
    theme: 'light',
    platform: 'ios',
    withMaxUiWrapper: true
  }
};

export default preview;
