import type { Meta, StoryObj } from '@storybook/react-vite';

import { OverlayContainer } from '../../../.storybook/components/OverlayContainer';
import { useColorScheme } from '../../hooks';
import { Button } from '../Button';
import { Dot, type DotProps } from './Dot';

const meta = {
  title: 'Common/Dot',
  component: Dot,
  args: {
    appearance: 'themed'
  },
  decorators: [
    (Story, context) => {
      const colorScheme = useColorScheme();

      return (
        <OverlayContainer
          style={{ width: 375 }}
          appearance={context.args.appearance === 'contrast-pinned' || colorScheme === 'dark' ? 'dark' : 'light'}
        >
          <Story />
        </OverlayContainer>
      );
    }
  ]
} satisfies Meta<DotProps>;

export default meta;
type Story = StoryObj<DotProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Dot {...args} />
    );
  }
};

export const DotInButton: Story = {
  name: 'Dot in Button',
  args: {
    appearance: 'inherit'
  },
  render: ({ ...args }) => {
    return (
      <Button
        indicator={<Dot {...args} />}
      >
        Messages
      </Button>
    );
  }
};
