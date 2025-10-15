import type { Preview } from '@storybook/react-vite';

import { withConfigProvider } from './decorators';

const preview: Preview = {
  parameters: {
    backgrounds: { disabled: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [withConfigProvider],
  initialGlobals: {
    theme: 'light',
    platform: 'ios',
    withMaxUiWrapper: true
  },
  globalTypes: {
    theme: {
      toolbar: {
        dynamicTitle: true,
        icon: 'sun',
        items: ['light', 'dark']
      }
    },
    platform: {
      toolbar: {
        dynamicTitle: true,
        icon: 'mobile',
        items: ['ios', 'android']
      }
    }
  }
};

export default preview;
