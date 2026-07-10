import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactElement } from 'react';

import * as icons from './index';

interface IconsGalleryProps {
  color: string
  size: number
}

const cellStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: 16,
  borderRadius: 12,
  background: 'rgba(0, 0, 0, 0.04)'
};
const nameStyle: CSSProperties = {
  fontSize: 12,
  color: '#000'
};
const containerStyle: CSSProperties = {
  display: 'flex',
  gap: 16,
  padding: 24,
  flexWrap: 'wrap'
};

function IconsGallery ({ color, size }: IconsGalleryProps): ReactElement {
  const iconWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: size,
    minHeight: 24,
    color
  };

  return (
    <div style={containerStyle}>
      {Object.entries(icons).map(([name, Icon]) => (
        <div key={name} style={cellStyle}>
          <span style={iconWrapperStyle}>
            <Icon width={size} height={size} />
          </span>
          <span style={nameStyle}>{name}</span>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Icons',
  component: IconsGallery,
  argTypes: {
    color: { control: 'color' },
    size: { control: { type: 'range', min: 8, max: 64, step: 1 } }
  },
  args: {
    color: '#000000',
    size: 24
  }
} satisfies Meta<IconsGalleryProps>;

export default meta;
type Story = StoryObj<IconsGalleryProps>;

export const Playground: Story = {
  render: ({ ...args }) => <IconsGallery {...args} />
};
