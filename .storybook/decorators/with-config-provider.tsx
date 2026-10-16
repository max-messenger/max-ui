import { type Decorator } from '@storybook/react-vite';

import { GuiduUI } from '../../src';
import { OverlayContainer } from '../components/OverlayContainer';

export const withConfigProvider: Decorator = (Story, context) => {
  if (!context.globals.withMaxUiWrapper || context.parameters.withMaxUiWrapper === false) return <Story />;

  return (
    <GuiduUI platform={context.globals.platform} colorScheme={context.globals.theme}>
      <OverlayContainer appearance={context.globals.theme}>
        <Story />
      </OverlayContainer>
    </GuiduUI>
  );
};
