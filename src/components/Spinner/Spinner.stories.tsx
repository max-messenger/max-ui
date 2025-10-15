import type { Meta, StoryObj } from '@storybook/react-vite';

import { OverlayContainer } from '../../../.storybook/components/OverlayContainer';
import { useColorScheme } from '../../hooks';
import { Spinner, type SpinnerProps } from './Spinner';

const meta = {
  title: 'Common/Spinner',
  component: Spinner,
  args: {
    appearance: 'primary',
    size: 20
  },
  decorators: [
    (Story, context) => {
      const colorScheme = useColorScheme();

      return (
        <OverlayContainer
          style={{ width: 375 }}
          appearance={['contrast', 'contrast-static'].includes(context?.args.appearance ?? 'primary') || colorScheme === 'dark' ? 'dark' : 'light'}
        >
          <Story />
        </OverlayContainer>
      );
    }
  ]
} satisfies Meta<SpinnerProps>;

export default meta;
type Story = StoryObj<SpinnerProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Spinner {...args} />
    );
  }
};
