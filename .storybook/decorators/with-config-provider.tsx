import { type Decorator } from '@storybook/react-vite';

import { MaxUI } from '../../src';
import { OverlayContainer } from '../components/OverlayContainer';

export const withConfigProvider: Decorator = (Story, context) => {
  if (!context.globals.withMaxUiWrapper) return <Story />;

  return (
    <MaxUI platform={context.globals.platform} colorScheme={context.globals.theme}>
      <OverlayContainer appearance={context.globals.theme}>
        <Story />
      </OverlayContainer>
    </MaxUI>
  );
};
