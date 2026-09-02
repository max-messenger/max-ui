import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon16Placeholder from '@storybook-config/assets/icons/icon-16-placeholder.svg';
import Icon20Placeholder from '@storybook-config/assets/icons/icon-20-placeholder.svg';
import Icon24Placeholder from '@storybook-config/assets/icons/icon-24-placeholder.svg';
import Icon28Placeholder from '@storybook-config/assets/icons/icon-28-placeholder.svg';
import {
  ComponentMatrix,
  MatrixGroup,
  MatrixItem
} from '@storybook-config/components/ComponentMatrix';
import { type CSSProperties, type ReactNode } from 'react';

import {
  Avatar,
  Button,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
  CellAction,
  CellHeader,
  CellInput,
  CellList,
  CellSimple,
  Counter,
  type CounterVariant,
  IconButton,
  Input,
  Spinner,
  type SpinnerAppearance,
  Switch,
  Textarea,
  Typography,
  type TypographyActionVariant,
  type TypographyBodyVariant,
  type TypographyHeadlineVariant,
  type TypographyLabelVariant,
  type TypographyTextVariant,
  type TypographyTitleVariant
} from '../components';
import styles from './ComponentMatrices.module.scss';

const meta = {
  title: 'Matrices/Components',
  parameters: {
    layout: 'fullscreen',
    withMaxUiWrapper: false
  },
  tags: ['!autodocs']
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const createTypographyGroup = <T extends string>(
  title: string,
  variants: readonly T[],
  render: (variant: T) => ReactNode,
  getLabel: (variant: T) => string = (variant) => variant
) => ({
  title,
  items: variants.map((variant) => ({
    label: getLabel(variant),
    content: render(variant)
  }))
});

const typographyVariants = [
  createTypographyGroup(
    'Action',
    ['large', 'medium', 'small', 'xsmall'] satisfies readonly TypographyActionVariant[],
    (variant) => <Typography.Action variant={variant}>Пример текста</Typography.Action>
  ),
  createTypographyGroup(
    'Body',
    ['large', 'large-strong', 'medium', 'medium-strong', 'small', 'small-strong'] satisfies readonly TypographyBodyVariant[],
    (variant) => <Typography.Body variant={variant}>Пример текста</Typography.Body>
  ),
  createTypographyGroup(
    'Headline',
    ['large-strong', 'medium', 'small'] satisfies readonly TypographyHeadlineVariant[],
    (variant) => <Typography.Headline variant={variant}>Пример текста</Typography.Headline>,
    (variant) => {
      switch (variant) {
        case 'large-strong':
          return 'large-strong → Header';
        case 'medium':
          return 'medium → Subheader';
        case 'small':
          return 'small → Title';
        default:
          return variant;
      }
    }
  ),
  createTypographyGroup(
    'Label',
    ['large', 'large-strong', 'medium', 'medium-strong', 'small', 'small-strong'] satisfies readonly TypographyLabelVariant[],
    (variant) => <Typography.Label variant={variant}>Пример текста</Typography.Label>
  ),
  createTypographyGroup(
    'Title',
    ['large-strong', 'medium', 'medium-strong', 'small', 'small-strong'] satisfies readonly TypographyTitleVariant[],
    (variant) => <Typography.Title variant={variant}>Пример текста</Typography.Title>
  ),
  createTypographyGroup(
    'Text (semantic)',
    [
      'hero', 'header', 'subheader', 'title', 'body', 'body-strong', 'detail', 'detail-strong',
      'description', 'description-strong', 'label', 'label-strong', 'tag', 'tag-strong', 'note',
      'note-strong', 'action-large', 'action-medium', 'action-small', 'action-xsmall'
    ] satisfies readonly TypographyTextVariant[],
    (variant) => <Typography.Text variant={variant}>Пример текста</Typography.Text>
  )
];

export const TypographyMatrix: Story = {
  name: 'Typography',
  render: () => (
    <ComponentMatrix>
      {() => (
        <>
          <MatrixGroup title="Display" minItemWidth={180}>
            <MatrixItem label="display"><Typography.Display>Пример текста</Typography.Display></MatrixItem>
          </MatrixGroup>
          {typographyVariants.map(({ title, items }) => (
            <MatrixGroup key={title} title={title} minItemWidth={160}>
              {items.map(({ content, label }) => (
                <MatrixItem key={label} label={label}>
                  {content}
                </MatrixItem>
              ))}
            </MatrixGroup>
          ))}
        </>
      )}
    </ComponentMatrix>
  )
};

const avatarSizes = [24, 40, 52, 80] as const;

export const AvatarMatrix: Story = {
  name: 'Avatar',
  render: () => (
    <ComponentMatrix>
      {() => (
        <>
          <MatrixGroup title="Circle · sizes and online status" minItemWidth={100}>
            {avatarSizes.map((size) => (
              <MatrixItem key={size} label={`${size}px`}>
                <Avatar.Container size={size} onlineStatus>
                  <Avatar.Text gradient="blue">MX</Avatar.Text>
                </Avatar.Container>
              </MatrixItem>
            ))}
          </MatrixGroup>
          <MatrixGroup title="Squircle · sizes" minItemWidth={100}>
            {avatarSizes.map((size) => (
              <MatrixItem key={size} label={`${size}px`}>
                <Avatar.Container size={size} form="squircle">
                  <Avatar.Text gradient="purple">MX</Avatar.Text>
                </Avatar.Container>
              </MatrixItem>
            ))}
          </MatrixGroup>
          <MatrixGroup title="Content and overlay" minItemWidth={120}>
            <MatrixItem label="icon">
              <Avatar.Container><Avatar.Icon><Icon24Placeholder /></Avatar.Icon></Avatar.Container>
            </MatrixItem>
            <MatrixItem label="text">
              <Avatar.Container><Avatar.Text gradient="green">MX</Avatar.Text></Avatar.Container>
            </MatrixItem>
            <MatrixItem label="overlay">
              <Avatar.Container overlay={<Avatar.Overlay><Icon24Placeholder /></Avatar.Overlay>}>
                <Avatar.Text gradient="red">MX</Avatar.Text>
              </Avatar.Container>
            </MatrixItem>
            <MatrixItem label="close button">
              <Avatar.Container
                rightTopCorner={<Avatar.CloseButton aria-label="Закрыть" />}
                size={52}
              >
                <Avatar.Text gradient="orange">MX</Avatar.Text>
              </Avatar.Container>
            </MatrixItem>
          </MatrixGroup>
        </>
      )}
    </ComponentMatrix>
  )
};

const buttonVariants = [
  'primary', 'secondary', 'ghost', 'primary-contrast', 'secondary-contrast', 'overlay', 'destructive'
] as const satisfies readonly ButtonVariant[];
const buttonSizes = ['xsmall', 'small', 'medium', 'large'] as const satisfies readonly ButtonSize[];
const buttonStateNames = ['default', 'hover', 'pressed', 'focus', 'disabled', 'loading'] as const;
type ButtonStateName = typeof buttonStateNames[number];

const hoverBackgrounds: Record<ButtonVariant, string> = {
  primary: '--states-button-primary-hover',
  secondary: '--states-button-secondary-contrast-hover',
  ghost: '--states-button-ghost-hover',
  'primary-contrast': '--states-button-primary-contrast-hover',
  'secondary-contrast': '--states-button-secondary-hover',
  overlay: '--states-button-overlay-hover',
  destructive: '--states-button-negative-hover'
};

const getButtonStateProps = (variant: ButtonVariant, state: ButtonStateName): Partial<ButtonProps> => {
  switch (state) {
    case 'hover':
      return { style: { backgroundColor: `var(${hoverBackgrounds[variant]})` } };
    case 'pressed':
      return {
        style: {
          backgroundColor: 'var(--MaxUi-Button_background-active)',
          color: 'var(--MaxUi-Button_foreground-active, var(--MaxUi-Button_foreground))'
        }
      };
    case 'focus':
      return { className: styles.FocusVisible };
    case 'disabled':
      return { disabled: true };
    case 'loading':
      return { loading: true, 'aria-label': 'Загрузка' };
    default:
      return {};
  }
};

const getIconButtonStateProps = (variant: ButtonVariant, state: ButtonStateName): Partial<ButtonProps> => {
  const stateProps = getButtonStateProps(variant, state);

  if (state !== 'pressed') return stateProps;

  return {
    style: {
      backgroundColor: 'var(--MaxUi-IconButton_background-active)',
      color: 'var(--MaxUi-IconButton_foreground-active, var(--MaxUi-IconButton_foreground))'
    }
  };
};

const getIconForButtonSize = (size: ButtonSize): ReactNode => (
  size === 'xsmall' || size === 'small' ? <Icon16Placeholder /> : <Icon24Placeholder />
);

export const ButtonMatrix: Story = {
  name: 'Button and Button Loading',
  render: () => (
    <ComponentMatrix>
      {() => (
        <>
          <MatrixGroup title="Variants × sizes" minItemWidth={150}>
            {buttonVariants.flatMap((variant) => buttonSizes.map((size) => (
              <MatrixItem key={`${variant}-${size}`} label={`${variant} · ${size}`}>
                <Button variant={variant} size={size} iconBefore={getIconForButtonSize(size)}>Кнопка</Button>
              </MatrixItem>
            )))}
          </MatrixGroup>
          <MatrixGroup title="States · medium" minItemWidth={150}>
            {buttonVariants.flatMap((variant) => buttonStateNames.map((state) => (
              <MatrixItem key={`${variant}-${state}`} label={`${variant} · ${state}`}>
                <Button variant={variant} size="medium" {...getButtonStateProps(variant, state)}>Кнопка</Button>
              </MatrixItem>
            )))}
          </MatrixGroup>
        </>
      )}
    </ComponentMatrix>
  )
};

export const IconButtonMatrix: Story = {
  name: 'IconButton',
  render: () => (
    <ComponentMatrix>
      {() => (
        <>
          <MatrixGroup title="Variants × sizes" minItemWidth={120}>
            {buttonVariants.flatMap((variant) => buttonSizes.map((size) => (
              <MatrixItem key={`${variant}-${size}`} label={`${variant} · ${size}`}>
                <IconButton aria-label="Кнопка с иконкой" variant={variant} size={size}>{getIconForButtonSize(size)}</IconButton>
              </MatrixItem>
            )))}
          </MatrixGroup>
          <MatrixGroup title="States · medium" minItemWidth={120}>
            {buttonVariants.flatMap((variant) => buttonStateNames.map((state) => {
              const stateProps = getIconButtonStateProps(variant, state);
              return (
                <MatrixItem key={`${variant}-${state}`} label={`${variant} · ${state}`}>
                  <IconButton
                    aria-label="Кнопка с иконкой"
                    variant={variant}
                    size="medium"
                    className={stateProps.className}
                    disabled={stateProps.disabled}
                    loading={stateProps.loading}
                    style={stateProps.style}
                  >
                    <Icon24Placeholder />
                  </IconButton>
                </MatrixItem>
              );
            }))}
          </MatrixGroup>
        </>
      )}
    </ComponentMatrix>
  )
};

const counterVariants = [
  'primary', 'primary-contrast', 'attention', 'attention-contrast', 'promo', 'static',
  'static-contrast', 'default', 'mute', 'menu'
] as const satisfies readonly CounterVariant[];

export const CounterMatrix: Story = {
  name: 'Counter',
  render: () => (
    <ComponentMatrix>
      {() => (
        <MatrixGroup title="Counter variants" minItemWidth={110}>
          {counterVariants.flatMap((variant) => [12, 1200].map((value) => (
            <MatrixItem key={`${variant}-${value}`} label={`${variant} · ${value === 1200 ? 'rounded' : 'exact'}`}>
              <Counter variant={variant} value={value} rounded={value === 1200} />
            </MatrixItem>
          )))}
        </MatrixGroup>
      )}
    </ComponentMatrix>
  )
};

const cellVisualStates = ['default', 'hover', 'pressed', 'focus', 'disabled'] as const;

const getCellStateProps = (state: typeof cellVisualStates[number]): { disabled?: boolean; className?: string; style?: CSSProperties } => {
  switch (state) {
    case 'hover':
      return { style: { backgroundColor: 'var(--states-background-hovered-transparent)' } };
    case 'pressed':
      return { style: { backgroundColor: 'var(--states-background-pressed-transparent)' } };
    case 'focus':
      return { className: styles.FocusVisible };
    case 'disabled':
      return { disabled: true };
    default:
      return {};
  }
};

export const CellMatrix: Story = {
  name: 'Cell',
  render: () => (
    <ComponentMatrix>
      {() => (
        <>
          <MatrixGroup title="CellSimple states" minItemWidth={280}>
            {cellVisualStates.map((state) => (
              <MatrixItem key={state} label={state} stretched>
                <CellSimple
                  {...getCellStateProps(state)}
                  className={`${styles.PreviewWidth} ${getCellStateProps(state).className ?? ''}`}
                  title="Заголовок"
                  subtitle="Подпись"
                  before={<Avatar.Container size={40}><Avatar.Text gradient="blue">MX</Avatar.Text></Avatar.Container>}
                  after={<Counter value={12} />}
                  showChevron
                  onClick={() => {}}
                />
              </MatrixItem>
            ))}
          </MatrixGroup>
          <MatrixGroup title="CellAction modes" minItemWidth={220}>
            {(['primary', 'secondary', 'themed', 'destructive'] as const).map((mode) => (
              <MatrixItem key={mode} label={mode} stretched>
                <CellAction
                  className={styles.PreviewWidth}
                  mode={mode}
                  before={<Icon28Placeholder />}
                  showChevron
                  onClick={() => {}}
                >
                  Действие
                </CellAction>
              </MatrixItem>
            ))}
          </MatrixGroup>
          <MatrixGroup title="CellInput states" minItemWidth={240}>
            <MatrixItem label="default" stretched><CellInput className={styles.PreviewWidth} before="Имя" placeholder="Введите имя" /></MatrixItem>
            <MatrixItem label="filled" stretched><CellInput className={styles.PreviewWidth} before="Имя" defaultValue="Иван" /></MatrixItem>
            <MatrixItem label="disabled" stretched><CellInput className={styles.PreviewWidth} before="Имя" defaultValue="Иван" disabled /></MatrixItem>
          </MatrixGroup>
          <MatrixGroup title="CellList and CellHeader" minItemWidth={280}>
            {(['full-width', 'island'] as const).flatMap((mode) => [false, true].map((filled) => (
              <MatrixItem key={`${mode}-${filled}`} label={`${mode} · ${filled ? 'filled' : 'transparent'}`} stretched>
                <CellList
                  className={styles.PreviewWidth}
                  mode={mode}
                  filled={filled}
                  header={<CellHeader titleStyle="caps">Заголовок</CellHeader>}
                >
                  <CellSimple title="Ячейка" subtitle="Подпись" />
                </CellList>
              </MatrixItem>
            )))}
          </MatrixGroup>
        </>
      )}
    </ComponentMatrix>
  )
};

export const SwitchMatrix: Story = {
  name: 'Switch',
  render: () => (
    <ComponentMatrix>
      {() => (
        <MatrixGroup title="States" minItemWidth={100}>
          <MatrixItem label="default · off"><Switch aria-label="Выключено" /></MatrixItem>
          <MatrixItem label="default · on"><Switch aria-label="Включено" defaultChecked /></MatrixItem>
          <MatrixItem label="disabled · off"><Switch aria-label="Выключено и недоступно" disabled /></MatrixItem>
          <MatrixItem label="disabled · on"><Switch aria-label="Включено и недоступно" defaultChecked disabled /></MatrixItem>
          <MatrixItem label="focus"><Switch aria-label="Переключатель в фокусе" className={styles.FocusVisible} /></MatrixItem>
        </MatrixGroup>
      )}
    </ComponentMatrix>
  )
};

const inputStates = ['default', 'filled', 'focus', 'disabled'] as const;

export const InputMatrix: Story = {
  name: 'Input',
  render: () => (
    <ComponentMatrix>
      {() => (
        <MatrixGroup title="Modes × sizes × states" minItemWidth={260}>
          {(['default', 'contrast'] as const).flatMap((mode) => (['medium', 'large'] as const).flatMap((size) => inputStates.map((state) => (
            <MatrixItem key={`${mode}-${size}-${state}`} label={`${mode} · ${size} · ${state}`} stretched>
              <div className={`${styles.ControlWidth} ${mode === 'contrast' ? styles.ContrastSurface : ''}`}>
                <Input
                  mode={mode}
                  size={size}
                  placeholder="Введите текст"
                  defaultValue={state === 'filled' || state === 'focus' || state === 'disabled' ? 'Текст' : undefined}
                  disabled={state === 'disabled'}
                  className={state === 'focus' ? styles.FocusVisible : undefined}
                  iconBefore={<Icon20Placeholder />}
                  count={12}
                  withClearButton
                  innerClassNames={state === 'focus' ? { clearButton: styles.InputClearButtonVisible } : undefined}
                  hint="Подсказка"
                />
              </div>
            </MatrixItem>
          ))))}
        </MatrixGroup>
      )}
    </ComponentMatrix>
  )
};

export const TextareaMatrix: Story = {
  name: 'Textarea',
  render: () => (
    <ComponentMatrix>
      {() => (
        <MatrixGroup title="Modes × states" minItemWidth={260}>
          {(['primary', 'secondary'] as const).flatMap((mode) => (['default', 'filled', 'focus', 'disabled'] as const).map((state) => (
            <MatrixItem key={`${mode}-${state}`} label={`${mode} · ${state}`} stretched>
              <Textarea
                className={`${styles.ControlWidth} ${state === 'focus' ? styles.FocusVisible : ''}`}
                mode={mode}
                placeholder="Введите текст"
                defaultValue={state === 'filled' || state === 'focus' || state === 'disabled' ? 'Текст' : undefined}
                disabled={state === 'disabled'}
              />
            </MatrixItem>
          )))}
        </MatrixGroup>
      )}
    </ComponentMatrix>
  )
};

const spinnerAppearances = [
  'primary', 'themed', 'neutral-themed', 'primary-static', 'contrast', 'contrast-static', 'negative'
] as const satisfies readonly SpinnerAppearance[];

export const SpinnerMatrix: Story = {
  name: 'Spinner',
  render: () => (
    <ComponentMatrix>
      {() => (
        <MatrixGroup title="Appearances × sizes" minItemWidth={120}>
          {spinnerAppearances.flatMap((appearance) => [20, 24, 40].map((size) => (
            <MatrixItem key={`${appearance}-${size}`} label={`${appearance} · ${size}px`}>
              <div className={appearance.includes('contrast') ? styles.ContrastSurface : undefined}>
                <Spinner appearance={appearance} size={size} />
              </div>
            </MatrixItem>
          )))}
        </MatrixGroup>
      )}
    </ComponentMatrix>
  )
};
