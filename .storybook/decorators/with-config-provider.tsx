import { type Decorator } from '@storybook/react-vite';

import { MaxUI } from '../../src';

export const withConfigProvider: Decorator = (Story, context) => {
  if (!context.globals.withMaxUiWrapper) return <Story />;

  return (
    <MaxUI platform={context.globals.platform} colorScheme={context.globals.theme}>
      <Story />
    </MaxUI>
  );
};
