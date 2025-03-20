import { type Decorator } from '@storybook/react';

import { MaxUi } from '../../src';

export const withConfigProvider: Decorator = (Story, context) => {
  if (!context.globals.withMaxUiWrapper) return <Story />;

  return (
    <MaxUi platform={context.globals.platform} colorScheme={context.globals.theme}>
      <Story />
    </MaxUi>
  );
};
