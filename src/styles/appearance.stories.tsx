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

type PaletteGroupName = 'Accent' | 'Background' | 'Gradients' | 'Icon' | 'Promo' | 'Shadow' | 'States' | 'Stroke' | 'Text'

const palette: Record<PaletteGroupName, string[]> = {
  Accent: ['--accent-red',
    '--accent-secondary',
    '--accent-themed'],
  Background: ['--background-contrast-floating-android',
    '--background-contrast-floating-secondary-android',
    '--background-contrast-floating-secondary-i-os',
    '--background-contrast-floating-i-os',
    '--background-neutral-floating-android',
    '--background-neutral-floating-i-os',
    '--background-overlay',
    '--background-overlay-secondary',
    '--background-overlay-static',
    '--background-surface-card',
    '--background-surface-floating',
    '--background-surface-ground',
    '--background-surface-primary',
    '--background-surface-secondary',
    '--background-surface-tertiary',
    '--background-transparent',
    '--background-accent-attention-primary',
    '--background-accent-attention-secondary',
    '--background-accent-contrast-static',
    '--background-accent-contrast',
    '--background-accent-contrast-secondary',
    '--background-accent-contrast-secondary-static',
    '--background-button-secondary',
    '--background-button-secondary-hovered',
    '--background-button-secondary-pressed',
    '--background-button-secondary-disabled',
    '--background-button-secondary-contrast',
    '--background-button-secondary-contrast-hovered',
    '--background-button-secondary-contrast-pressed',
    '--background-button-secondary-contrast-disabled',
    '--background-button-overlay',
    '--background-button-overlay-hovered',
    '--background-button-overlay-pressed',
    '--background-button-overlay-disabled',
    '--background-accent-negative',
    '--background-accent-neutral',
    '--background-accent-neutral-default',
    '--background-accent-neutral-fade',
    '--background-accent-neutral-fade-secondary',
    '--background-accent-neutral-static',
    '--background-accent-neutral-themed',
    '--background-accent-positive',
    '--background-accent-themed',
    '--background-local-chips-active',
    '--background-local-chips-default',
    '--background-local-tab-bar-android',
    '--background-local-tab-bar-i-os',
    '--background-local-top-bar-primary-android',
    '--background-local-top-bar-primary-i-os',
    '--background-local-top-bar-secondary-android',
    '--background-local-top-bar-secondary-i-os',
    '--background-mute',
    '--background-menu'],
  Gradients: ['--gradients-banner-dk-background-fantasy-step-1',
    '--gradients-banner-dk-background-fantasy-step-2',
    '--gradients-banner-dk-background-icon-container-step-1',
    '--gradients-banner-dk-background-icon-container-step-2',
    '--gradients-banner-dk-background-vibrant-step-1',
    '--gradients-banner-dk-background-vibrant-step-2',
    '--gradients-banner-dk-stroke-icon-container-step-1',
    '--gradients-banner-dk-stroke-icon-container-step-2',
    '--gradients-banner-dk-stroke-icon-container-step-3',
    '--gradients-button-text-promo-default-step-1',
    '--gradients-button-text-promo-default-step-2',
    '--gradients-button-text-promo-default-step-3',
    '--gradients-button-text-promo-default-step-4',
    '--gradients-button-text-promo-disabled-step-1',
    '--gradients-button-text-promo-disabled-step-2',
    '--gradients-button-text-promo-disabled-step-3',
    '--gradients-button-text-promo-disabled-step-4',
    '--gradients-button-text-promo-pressed-step-1',
    '--gradients-button-text-promo-pressed-step-2',
    '--gradients-button-text-promo-pressed-step-3',
    '--gradients-button-text-promo-pressed-step-4',
    '--gradients-complex-overlay-floating-step-1',
    '--gradients-complex-overlay-floating-step-2',
    '--gradients-complex-overlay-floating-step-3',
    '--gradients-empty-block-icon-wrapper-shape-step-1',
    '--gradients-empty-block-icon-wrapper-shape-step-2',
    '--gradients-empty-block-icon-wrapper-stroke-step-1',
    '--gradients-empty-block-icon-wrapper-stroke-step-2',
    '--gradients-empty-block-icon-wrapper-stroke-step-3',
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
    '--gradients-loading-icon-themed-transparent'],
  Icon: ['--icon-contrast',
    '--icon-contrast-static',
    '--icon-negative',
    '--icon-neutral-themed',
    '--icon-positive',
    '--icon-primary',
    '--icon-primary-static',
    '--icon-quaternary',
    '--icon-secondary',
    '--icon-tertiary',
    '--icon-themed'],
  Promo: [
    '--promo-text-step-1'
  ],
  Shadow: [
    '--shadow-android-tab-bar-default-color',
    '--shadow-android-tab-bar-scroll-color',
    '--shadow-android-top-bar-scroll-color',
    '--shadow-elevation-1-primary',
    '--shadow-elevation-1-secondary',
    '--shadow-elevation-2-primary',
    '--shadow-elevation-2-secondary',
    '--shadow-elevation-3-primary',
    '--shadow-elevation-3-secondary',
    '--shadow-elevation-4-primary',
    '--shadow-elevation-4-secondary',
    '--shadow-tabbar-color'
  ],
  States: [
    '--states-background-active-contrast-static',
    '--states-background-active-negative',
    '--states-background-active-neutral',
    '--states-background-active-neutral-fade',
    '--states-background-active-neutral-themed',
    '--states-background-active-overlay-static',
    '--states-background-active-themed',
    '--states-background-active-transparent',
    '--states-background-active-transparent-secondary-static',
    '--states-background-disabled-card',
    '--states-background-disabled-contrast',
    '--states-background-disabled-contrast-static',
    '--states-background-disabled-negative',
    '--states-background-disabled-neutral',
    '--states-background-disabled-neutral-fade',
    '--states-background-disabled-neutral-static',
    '--states-background-disabled-neutral-themed',
    '--states-background-disabled-overlay-static',
    '--states-background-disabled-positive',
    '--states-background-disabled-secondary',
    '--states-background-disabled-themed',
    '--states-background-hovered-card',
    '--states-background-hovered-contrast-static',
    '--states-background-hovered-destructive',
    '--states-background-hovered-neutral',
    '--states-background-hovered-neutral-fade',
    '--states-background-hovered-neutral-themed',
    '--states-background-hovered-positive',
    '--states-background-hovered-themed',
    '--states-background-hovered-transparent',
    '--states-background-hovered-transparent-select',
    '--states-background-pressed-card',
    '--states-background-pressed-contrast-static',
    '--states-background-pressed-negative',
    '--states-background-pressed-neutral',
    '--states-background-pressed-neutral-fade',
    '--states-background-pressed-neutral-themed',
    '--states-background-pressed-positive',
    '--states-background-pressed-themed',
    '--states-background-pressed-transparent',
    '--states-background-pressed-transparent-select',
    '--states-icon-disabled-contrast',
    '--states-icon-disabled-contrast-static',
    '--states-icon-disabled-negative',
    '--states-icon-disabled-neutral-themed',
    '--states-icon-disabled-positive',
    '--states-icon-disabled-primary',
    '--states-icon-disabled-primary-static',
    '--states-icon-disabled-themed',
    '--states-icon-hovered-contrast-static',
    '--states-icon-hovered-negative',
    '--states-icon-hovered-neutral-themed',
    '--states-icon-hovered-primary',
    '--states-icon-hovered-remove-attach',
    '--states-icon-hovered-tertiary',
    '--states-icon-hovered-themed',
    '--states-icon-pressed-contrast-static',
    '--states-icon-pressed-negative',
    '--states-icon-pressed-neutral-themed',
    '--states-icon-pressed-primary',
    '--states-icon-pressed-remove-attach',
    '--states-icon-pressed-tertiary',
    '--states-icon-pressed-themed',
    '--states-text-active-contrast-static',
    '--states-text-active-negative',
    '--states-text-active-neutral-themed',
    '--states-text-active-primary',
    '--states-text-active-themed',
    '--states-text-disabled-contrast',
    '--states-text-disabled-contrast-static',
    '--states-text-disabled-negative',
    '--states-text-disabled-neutral-themed',
    '--states-text-disabled-primary',
    '--states-text-disabled-primary-static',
    '--states-text-disabled-themed',
    '--states-text-hovered-contrast-static',
    '--states-text-hovered-negative',
    '--states-text-hovered-neutral-themed',
    '--states-text-hovered-primary',
    '--states-text-hovered-secondary',
    '--states-text-hovered-themed',
    '--states-text-pressed-contrast-static',
    '--states-text-pressed-negative',
    '--states-text-pressed-neutral-themed',
    '--states-text-pressed-primary',
    '--states-text-pressed-secondary',
    '--states-text-pressed-themed'
  ],
  Stroke: [
    '--stroke-contrast-secondary-static',
    '--stroke-contrast-static',
    '--stroke-negative',
    '--stroke-positive',
    '--stroke-secondary',
    '--stroke-themed',
    '--stroke-transparent',
    '--stroke-local-carver-tab-bar',
    '--stroke-local-tab-bar-android',
    '--stroke-local-tab-bar-i-os',
    '--stroke-local-top-bar-android',
    '--stroke-local-top-bar-i-os',
    '--stroke-separator-contrast',
    '--stroke-separator-primary',
    '--stroke-separator-secondary'
  ],
  Text: [
    '--text-contrast',
    '--text-contrast-static',
    '--text-negative',
    '--text-neutral-themed',
    '--text-positive',
    '--text-primary',
    '--text-primary-inverse',
    '--text-primary-static',
    '--text-secondary',
    '--text-subhead',
    '--text-tertiary',
    '--text-themed'
  ]
};

const meta = {
  title: 'Styles/Palette',
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

export const AccentPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Accent} title='Accent' />)
};
export const BackgroundPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Background} title='Background' />)
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
export const ShadowPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Shadow} title='Shadow' />)
};
export const StatesPalette: Story = {
  render: () => (<PaletteGroup variables={palette.States} title='States' />)
};
export const StrokePalette: Story = {
  render: () => (<PaletteGroup variables={palette.Stroke} title='Stroke' />)
};
export const TextPalette: Story = {
  render: () => (<PaletteGroup variables={palette.Text} title='Text' />)
};
