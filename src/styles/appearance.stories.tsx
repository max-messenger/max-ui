import type { Meta, StoryObj } from '@storybook/react-vite';
import { type CSSProperties, type ReactElement } from 'react';

const checkerboard: CSSProperties = {
  backgroundImage:
    'linear-gradient(45deg, #c8c8c8 25%, transparent 25%),' +
    'linear-gradient(-45deg, #c8c8c8 25%, transparent 25%),' +
    'linear-gradient(45deg, transparent 75%, #c8c8c8 75%),' +
    'linear-gradient(-45deg, transparent 75%, #c8c8c8 75%)',
  backgroundSize: '6px 6px',
  backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0'
};

type PaletteGroupName =
  | 'Background'
  | 'Button'
  | 'Controls'
  | 'Counter'
  | 'Divider'
  | 'Gradients'
  | 'Icon'
  | 'Promo'
  | 'States'
  | 'Text'

const palette: Record<PaletteGroupName, string[]> = {
  Background: [
    '--background-surface',
    '--background-primary',
    '--background-secondary',
    '--background-tertiary',
    '--background-card',
    '--background-overlay',
    '--background-overlay-secondary'
  ],
  Button: [
    '--button-primary',
    '--button-secondary',
    '--button-primary-contrast',
    '--button-secondary-contrast',
    '--button-negative',
    '--button-ghost',
    '--button-overlay'
  ],
  Controls: ['--controls-active', '--controls-inactive'],
  Counter: [
    '--counter-attention',
    '--counter-mute',
    '--counter-themed',
    '--counter-default',
    '--counter-mirage',
    '--counter-contrast',
    '--counter-menu'
  ],
  Divider: ['--divider-primary', '--divider-secondary'],
  Gradients: [
    '--gradients-loading-icon-contrast-filled',
    '--gradients-loading-icon-contrast-transparent',
    '--gradients-loading-icon-contrast-static-filled',
    '--gradients-loading-icon-contrast-static-transparent',
    '--gradients-loading-icon-negative-filled',
    '--gradients-loading-icon-negative-transparent',
    '--gradients-loading-icon-neutral-themed-filled',
    '--gradients-loading-icon-neutral-themed-transparent',
    '--gradients-loading-icon-primary-filled',
    '--gradients-loading-icon-primary-transparent',
    '--gradients-loading-icon-primary-static-filled',
    '--gradients-loading-icon-primary-static-transparent',
    '--gradients-loading-icon-themed-filled',
    '--gradients-loading-icon-themed-transparent'
  ],
  Icon: [
    '--icon-primary',
    '--icon-tertiary',
    '--icon-mute',
    '--icon-primary-static',
    '--icon-primary-inverse',
    '--icon-primary-inverse-static',
    '--icon-themed',
    '--icon-positive',
    '--icon-negative',
  ],
  Promo: ['--promo-text-step-1'],
  States: [
    '--states-background-card-disabled',
    '--states-icon-primary-disabled',
    '--states-icon-tertiary-hover',
    '--states-button-primary-hover',
    '--states-button-primary-pressed',
    '--states-button-primary-disabled',
    '--states-button-secondary-hover',
    '--states-button-secondary-pressed',
    '--states-button-secondary-disabled',
    '--states-button-primary-contrast-hover',
    '--states-button-primary-contrast-pressed',
    '--states-button-primary-contrast-disabled',
    '--states-button-secondary-contrast-hover',
    '--states-button-secondary-contrast-pressed',
    '--states-button-secondary-contrast-disabled',
    '--states-button-negative-hover',
    '--states-button-negative-pressed',
    '--states-button-negative-disabled',
    '--states-button-ghost-hover',
    '--states-button-ghost-pressed',
    '--states-button-overlay-hover',
    '--states-button-overlay-pressed',
    '--states-button-overlay-disabled',
    '--states-text-primary-disabled',
    '--states-text-secondary-disabled',
    '--states-text-tertiary-disabled',
    '--states-text-primary-static-disabled',
    '--states-text-primary-inverse-static-disabled',
    '--states-text-themed-disabled',
    '--states-text-negative-disabled',
    '--states-controls-active-disabled',
    '--states-controls-inactive-disabled',
    '--states-counter-contrast-disabled',
    '--states-counter-default-disabled'
  ],
  Text: [
    '--text-primary',
    '--text-secondary',
    '--text-tertiary',
    '--text-primary-static',
    '--text-primary-inverse',
    '--text-primary-inverse-static',
    '--text-themed',
    '--text-negative'
  ]
};

const meta = {
  title: 'Foundations/Palette',
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [(Story) => (
    <div style={{ padding: 16 }}>
      <h1 style={{ margin: '0 0 4px', fontSize: 20, color: 'var(--text-primary)' }}>Палитра цветов</h1>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-secondary)' }}>
        Переключайте тему (light/dark) через панель инструментов Storybook.
      </p>
      <Story />
    </div>
  )]
} satisfies Meta;

export default meta;
type Story = StoryObj;

const colorSize = 25;

const ColorSwatch = ({ name }: { name: string }): ReactElement => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <div style={{ width: colorSize, height: colorSize, flexShrink: 0, ...checkerboard }}>
      <div style={{ width: colorSize, height: colorSize, backgroundColor: `var(${name})` }} />
    </div>
    <span style={{ color: 'var(--text-primary)' }}>{name}</span>
  </div>
);
interface PaletteGroupProps { title: string, variables: string[] }
const PaletteGroup = ({ title, variables }: PaletteGroupProps): ReactElement => (
  <section key={title} style={{ marginBottom: 24 }}>
    <h2 style={{ margin: '0 0 8px', fontSize: 15, color: 'var(--text-primary)' }}>
      {title}
      <span style={{ color: 'var(--text-tertiary)' }}>
        (
        {variables.length}
        )
      </span>
    </h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
      {variables.map((name) => (
        <ColorSwatch key={name} name={name} />
      ))}
    </div>
  </section>
);

export const BackgroundPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Background} title='Background' />)
};
export const ButtonPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Button} title='Button' />)
};
export const ControlsPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Controls} title='Controls' />)
};
export const CounterPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Counter} title='Counter' />)
};
export const DividerPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Divider} title='Divider' />)
};
export const GradientsPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Gradients} title='Gradients' />)
};
export const IconPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Icon} title='Icon' />)
};
export const PromoPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Promo} title='Promo' />)
};
export const StatesPalette: Story = {
  render: () => (<PaletteGroup variables={palette.States} title='States' />)
};
export const TextPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Text} title='Text' />)
};
