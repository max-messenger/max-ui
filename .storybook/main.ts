import path from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    path.resolve(__dirname, './addons/theme'),
    path.resolve(__dirname, './addons/platform'),
    path.resolve(__dirname, './addons/variants')
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },
  async viteFinal (config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler'
          }
        }
      },
      plugins: [
        svgr({ include: '**/*.svg' })
      ]
    });
  }
};
export default config;
