import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon24Placeholder from '@storybook-config/assets/icons/icon-24-placeholder.svg';
import { hideArgsControl, optionalControl, reactNodeTextControl, resolveOptionalControl, selectControl } from '@storybook-config/shared';
import { fn } from 'storybook/test';

import { EllipsisText } from '../../internal';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Counter } from '../Counter';
import { CellSimple, type CellSimpleProps } from './CellSimple';

const beforeOptions = {
  icon: <Icon24Placeholder key="icon" />,
  avatar: (
    <Avatar.Container key="avatar" onlineStatus size={40}>
      <Avatar.Image src="https://sun9-21.userapi.com/1N-rJz6-7hoTDW7MhpWe19e_R_TdGV6Wu5ZC0A/67o6-apnAks.jpg" />
    </Avatar.Container>
  )
};

const afterOptions = {
  button: <Button variant="secondary" size="small" key="button">Открыть</Button>,
  counter: <Counter key="counter" value={1200} />
};

const meta = {
  title: 'Components/Cell/CellSimple',
  component: CellSimple,
  parameters: {
    cartesian: ['height', 'subtitleMode']
  },
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames', 'onClick', 'as']),

    height: selectControl(['compact', 'normal']),
    subtitleMode: selectControl(['secondary', 'tertiary']),
    title: reactNodeTextControl,
    subtitle: reactNodeTextControl,
    link: { control: 'text' },
    before: optionalControl(beforeOptions),
    after: optionalControl(afterOptions)
  },
  args: {
    title: 'Заголовок',
    subtitle: 'Подпись',
    overline: '',
    height: 'normal',
    showChevron: false,
    disabled: false,
    before: 'icon',
    after: 'button',
    separator: false,
    link: undefined
  },
  decorators: [
    (Story, context) => (
      <div style={{ width: 375 }}>
        <Story
          args={{
            ...context.args,
            before: resolveOptionalControl(beforeOptions, context.args.before),
            after: resolveOptionalControl(afterOptions, context.args.after)
          }}
        />
      </div>
    )
  ]
} satisfies Meta<CellSimpleProps>;

export default meta;
type Story = StoryObj<CellSimpleProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return <CellSimple {...args} />;
  }
};

export const TappableCell: Story = {
  name: 'Tappable',
  args: {
    showChevron: true,
    after: <Counter key="counter" value={1200} />,
    onClick: fn()
  },
  render: ({ ...args }) => {
    return <CellSimple {...args} />;
  }
};

export const AsLink: Story = {
  name: 'As link',
  args: {
    title: 'Я — ссылка!',
    subtitle: undefined,
    after: undefined
  },
  render: ({ ...args }) => {
    return (
      <CellSimple {...args} asChild>
        <a
          href="https://imgur.com/fJDSm0v"
          target="_blank"
          rel="noreferrer"
        />
      </CellSimple>
    );
  }
};

export const EllipsizedTitle: Story = {
  name: 'Ellipsized title',
  args: {
    title: 'Я — ячейка с очень длинным заголовком, поэтому люди не смогут дочитать меня до конца',
    subtitle: 'Подпись тоже очень длинная, но в этом примере она будет выводиться полностью'
  },
  render: ({ title, ...args }) => {
    return (
      <CellSimple
        title={<EllipsisText>{title}</EllipsisText>}
        {...args}
      />
    );
  }
};

export const EllipsizedSubtitle: Story = {
  name: 'Ellipsized subtitle',
  args: {
    title: 'Я — ячейка с очень длинным заголовком, но в этот раз текст не будет обрезан',
    subtitle: 'Чего не скажешь о длинной подписи, в этом примере она будет обрезан'
  },
  render: ({ subtitle, ...args }) => {
    return (
      <CellSimple
        subtitle={<EllipsisText>{subtitle}</EllipsisText>}
        {...args}
      />
    );
  }
};
