import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Container, type ContainerProps } from './Container';

const meta = {
  title: 'Layout/Container',
  component: Container,
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    fullWidth: false
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375, height: 375 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<ContainerProps>;

export default meta;
type Story = StoryObj<ContainerProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Container {...args}>
        <Flex gap={12} direction="column">
          <Button
            size="large"
            stretched
            mode="secondary"
            appearance="neutral"
          >
            Кнопка
          </Button>

          <Button
            size="large"
            stretched
            mode="secondary"
            appearance="neutral"
          >
            Кнопка 2
          </Button>
        </Flex>
      </Container>
    );
  }
};
