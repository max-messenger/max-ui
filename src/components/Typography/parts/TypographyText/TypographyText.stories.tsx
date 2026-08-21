import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideArgsControl } from '../../../../../.storybook/shared/args-manager';
import { MaxUI } from '../../../MaxUI';
import { Typography } from '../..';
import { TypographyText, type TypographyTextProps, type TypographyTextVariant } from './TypographyText';
import styles from './TypographyText.stories.module.scss';

const variants: Array<{ name: string, variant: TypographyTextVariant }> = [
  { name: 'Hero', variant: 'hero' },
  { name: 'Header', variant: 'header' },
  { name: 'Subheader', variant: 'subheader' },
  { name: 'Title', variant: 'title' },
  { name: 'Body', variant: 'body' },
  { name: 'Body Strong', variant: 'body-strong' },
  { name: 'Detail', variant: 'detail' },
  { name: 'Detail Strong', variant: 'detail-strong' },
  { name: 'Description', variant: 'description' },
  { name: 'Description Strong', variant: 'description-strong' },
  { name: 'Label', variant: 'label' },
  { name: 'Label Strong', variant: 'label-strong' },
  { name: 'Tag', variant: 'tag' },
  { name: 'Tag Strong', variant: 'tag-strong' },
  { name: 'Note', variant: 'note' },
  { name: 'Note Strong', variant: 'note-strong' },
  { name: 'Action Large', variant: 'action-large' },
  { name: 'Action Medium', variant: 'action-medium' },
  { name: 'Action Small', variant: 'action-small' },
  { name: 'Action XSmall', variant: 'action-xsmall' }
];

const meta = {
  title: 'Components/Typography/Typography.Text',
  component: TypographyText,
  parameters: {
    cartesian: ['variant']
  },
  argTypes: {
    ...hideArgsControl(['asChild'])
  },
  args: {
    children: 'Hello world'
  }
} satisfies Meta<TypographyTextProps>;

export default meta;
type Story = StoryObj<TypographyTextProps>;

export const Playground: Story = {
  render: (props) => <Typography.Text {...props} />
};

function TypographyScale () {
  return (
    <div className={styles.scale}>
      {variants.map(({ name, variant }) => (
        <div className={styles.row} key={variant}>
          <Typography.Text variant={variant}>{name}</Typography.Text>
          <Typography.Text variant="description" color="tertiary">
            {variant}
          </Typography.Text>
        </div>
      ))}
    </div>
  );
}

export const FigmaLightDarkMatrix: Story = {
  parameters: {
    layout: 'fullscreen'
  },
  render: () => (
    <div className={styles.matrix}>
      {(['light', 'dark'] as const).map((colorScheme) => (
        <MaxUI
          className={styles.theme}
          colorScheme={colorScheme}
          platform="android"
          key={colorScheme}
        >
          <Typography.Text className={styles.themeTitle} variant="header">
            {colorScheme === 'light' ? 'Light' : 'Dark'}
          </Typography.Text>
          <TypographyScale />
        </MaxUI>
      ))}
    </div>
  )
};
