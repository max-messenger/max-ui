import { clsx } from 'clsx';
import { type CSSProperties, type JSX, type ReactNode } from 'react';

import { MaxUI } from '../../../src';
import styles from './ComponentMatrix.module.scss';

export type MatrixTheme = 'light' | 'dark';
export type MatrixPlatform = 'ios' | 'android';

export interface MatrixEnvironment {
  theme: MatrixTheme
  platform: MatrixPlatform
}

export interface ComponentMatrixProps {
  children: (environment: MatrixEnvironment) => ReactNode
  themes?: readonly MatrixTheme[]
  platforms?: readonly MatrixPlatform[]
}

const defaultThemes: readonly MatrixTheme[] = ['light', 'dark'];
const defaultPlatforms: readonly MatrixPlatform[] = ['ios', 'android'];

export const ComponentMatrix = ({
  children,
  themes = defaultThemes,
  platforms = defaultPlatforms
}: ComponentMatrixProps): JSX.Element => (
  <div className={styles.ComponentMatrix}>
    {themes.flatMap((theme) => platforms.map((platform) => (
      <MaxUI
        className={styles.ComponentMatrix__environment}
        colorScheme={theme}
        key={`${theme}-${platform}`}
        platform={platform}
      >
        <section className={styles.ComponentMatrix__section}>
          <h2 className={styles.ComponentMatrix__environmentTitle}>
            {theme === 'light' ? 'Light' : 'Dark'}
            {' · '}
            {platform === 'ios' ? 'iOS' : 'Android'}
          </h2>
          {children({ theme, platform })}
        </section>
      </MaxUI>
    )))}
  </div>
);

export interface MatrixGroupProps {
  children: ReactNode
  title: string
  minItemWidth?: number
}

export const MatrixGroup = ({ children, title, minItemWidth = 120 }: MatrixGroupProps): JSX.Element => (
  <section className={styles.MatrixGroup}>
    <h3 className={styles.MatrixGroup__title}>{title}</h3>
    <div
      className={styles.MatrixGroup__grid}
      style={{ '--MatrixGrid_minItemWidth': `${minItemWidth}px` } as CSSProperties}
    >
      {children}
    </div>
  </section>
);

export interface MatrixItemProps {
  children: ReactNode
  label: string
  stretched?: boolean
}

export const MatrixItem = ({ children, label, stretched = false }: MatrixItemProps): JSX.Element => (
  <div className={styles.MatrixItem}>
    <span className={styles.MatrixItem__label}>{label}</span>
    <div className={clsx(styles.MatrixItem__content, stretched && styles.MatrixItem__content_stretched)}>
      {children}
    </div>
  </div>
);
