import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Icon24Placeholder from '../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { hideArgsControl } from '../../../.storybook/shared/args-manager';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Counter } from '../Counter';
import { EllipsisText } from '../EllipsisText';
import { CellSimple, type CellSimpleProps } from './CellSimple';

const meta = {
  title: 'Common/CellSimple',
  component: CellSimple,
  argTypes: {
    ...hideArgsControl(['asChild', 'innerClassNames', 'onClick', 'as']),

    title: { type: 'string' },
    subtitle: { type: 'string' },
    before: {
      options: [0, 1, 2],
      mapping: [
        undefined,
        <Icon24Placeholder key="icon" />,
        <Avatar.Container key="avatar" rightBottomCorner={<Avatar.OnlineDot />} size={40}>
          <Avatar.Image src="https://sun9-21.userapi.com/1N-rJz6-7hoTDW7MhpWe19e_R_TdGV6Wu5ZC0A/67o6-apnAks.jpg" />
        </Avatar.Container>
      ],
      control: {
        type: 'select',
        labels: ['None', 'Icon', 'Avatar']
      }
    },
    after: {
      options: [0, 1, 2],
      mapping: [undefined, <Button mode="secondary" size="small" key="icon">Открыть</Button>, <Counter key="counter" value={1200} />],
      control: {
        type: 'select',
        labels: ['None', 'Button', 'Counter']
      }
    }
  },
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    overline: '',
    height: 'normal',
    showChevron: false,
    disabled: false,
    before: 1,
    after: 1
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
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
  render: ({ children, ...args }) => {
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
  render: ({ title, children, ...args }) => {
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
  render: ({ subtitle, children, ...args }) => {
    return (
      <CellSimple
        subtitle={<EllipsisText>{subtitle}</EllipsisText>}
        {...args}
      />
    );
  }
};
