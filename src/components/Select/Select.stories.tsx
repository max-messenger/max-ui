import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon20Placeholder from '@storybook-config/assets/icons/icon-20-placeholder.svg';
import { CONTRAST_PREVIEW_BACKGROUND, hideArgsControl, selectControl } from '@storybook-config/shared';
import { useEffect, useRef, useState } from 'react';
import { fn } from 'storybook/test';

import { SelectOptionRow } from './parts/SelectOptionRow';
import { SelectSearch } from './parts/SelectSearch';
import { Select } from './Select';
import { type SelectBaseProps, type SelectOption, type SelectProps } from './types';

const onValueChange = fn();

const countries: SelectOption[] = [
  { value: 'ru', label: 'Россия', before: <span>🇷🇺</span>, hint: '+7' },
  { value: 'by', label: 'Беларусь', before: <span>🇧🇾</span>, hint: '+375' },
  { value: 'kz', label: 'Казахстан', before: <span>🇰🇿</span>, hint: '+7' },
  { value: 'am', label: 'Армения', before: <span>🇦🇲</span>, hint: '+374' },
  { value: 'uz', label: 'Узбекистан', before: <span>🇺🇿</span>, hint: '+998', disabled: true },
  { value: 'kg', label: 'Киргизия', before: <span>🇰🇬</span>, hint: '+996' },
  { value: 'tj', label: 'Таджикистан', before: <span>🇹🇯</span>, hint: '+992' },
  { value: 'ge', label: 'Грузия', before: <span>🇬🇪</span>, hint: '+995' },
  { value: 'az', label: 'Азербайджан', before: <span>🇦🇿</span>, hint: '+994' },
  { value: 'md', label: 'Молдова', before: <span>🇲🇩</span>, hint: '+373' }
];

const cities: SelectOption[] = [
  { value: 'msk', label: 'Москва', hint: 'Доставка завтра' },
  { value: 'spb', label: 'Санкт-Петербург', hint: 'Доставка завтра' },
  { value: 'ekb', label: 'Екатеринбург', hint: 'Доставка 2–3 дня' },
  { value: 'nsk', label: 'Новосибирск', hint: 'Доставка 2–3 дня' },
  { value: 'kzn', label: 'Казань', hint: 'Доставка 2–3 дня' },
  { value: 'sochi', label: 'Сочи', hint: 'Доставка 3–5 дней' }
];

const specializations: SelectOption[] = [
  { value: 'frontend', label: 'Frontend-разработчик' },
  { value: 'backend', label: 'Backend-разработчик' },
  { value: 'qa', label: 'Инженер по тестированию' },
  { value: 'design', label: 'Продуктовый дизайнер' },
  { value: 'analytics', label: 'Аналитик' },
  { value: 'pm', label: 'Проектный менеджер' }
];

const tariffs: SelectOption[] = [
  { value: 'pro', label: 'Профи' },
  { value: 'business', label: 'Бизнес' },
  { value: 'corporate', label: 'Корпоративный' }
];

const employees: SelectOption[] = [
  { value: 'anna', label: 'Анна Смирнова', before: <span>👩‍💻</span>, hint: 'anna@company.com' },
  { value: 'ivan', label: 'Иван Петров', before: <span>👨‍🔧</span>, hint: 'ivan@company.com' },
  { value: 'maria', label: 'Мария Козлова', before: <span>👩‍🎨</span>, hint: 'maria@company.com' },
  { value: 'oleg', label: 'Олег Сидоров', before: <span>👨‍💼</span>, hint: 'oleg@company.com' },
  { value: 'elena', label: 'Елена Волкова', before: <span>👩‍🔬</span>, hint: 'elena@company.com' },
  { value: 'pavel', label: 'Павел Морозов', before: <span>👨‍🚀</span>, hint: 'pavel@company.com' }
];

const statuses: SelectOption[] = [
  { value: 'active', label: 'Активен', before: <span>🟢</span> },
  { value: 'pending', label: 'На согласовании', before: <span>🟡</span> },
  { value: 'blocked', label: 'Заблокирован', before: <span>🔴</span> },
  { value: 'archived', label: 'В архиве', before: <span>⚫</span> }
];

const includesQuery = (option: SelectOption, query: string) => {
  return String(option.label).toLowerCase().includes(query.trim().toLowerCase());
};

const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    cartesian: ['mode', 'size', 'disabled']
  },
  argTypes: {
    ...hideArgsControl([
      'innerClassNames',
      'options',
      'customDropdownMenu',
      'selectedOptions',
      'filterOption',
      'onSearchChange',
      'onValueChange',
      'onOpenChange',
      'value',
      'defaultValue',
      'iconBefore',
      'placement'
    ]),
    mode: selectControl(['default', 'contrast']),
    size: selectControl(['medium', 'large']),
    disabled: { control: 'boolean' },
    dropdownWidth: selectControl(['trigger', 'auto']),
    hint: { control: 'text' },
    placeholder: { control: 'text' },
    emptyText: { control: 'text' },
    searchPlaceholder: { control: 'text' }
  },
  args: {
    mode: 'default',
    size: 'large',
    disabled: false,
    searchable: false,
    withClearButton: false,
    loading: false,
    dropdownWidth: 'trigger',
    emptyText: 'Ничего не найдено',
    onValueChange
  },
  decorators: [
    (Story, context) => (
      <div style={{ padding: 12, borderRadius: 12, background: context.args.mode === 'contrast' ? CONTRAST_PREVIEW_BACKGROUND : undefined }}>
        <div style={{ minWidth: 350 }}>
          <Story />
        </div>
      </div>
    )
  ]
} satisfies Meta<SelectProps>;

export default meta;
type Story = StoryObj<SelectProps>;

export const Playground: Story = {
  args: {
    options: countries,
    hint: 'Подсказка',
    placeholder: 'Выберите страну',
    'aria-label': 'Страна',
    searchable: true,
    withClearButton: true,
    defaultValue: 'ru'
  }
};

export const Single: Story = {
  args: {
    options: cities,
    placeholder: 'Город доставки',
    'aria-label': 'Город доставки',
    withClearButton: true
  },
  render: function Render (args: SelectBaseProps) {
    const [value, setValue] = useState('msk');

    return (
      <Select
        {...args}
        multiple={false}
        iconBefore={<Icon20Placeholder />}
        value={value}
        onValueChange={(nextValue, option) => {
          setValue(nextValue);
          onValueChange(nextValue, option);
        }}
      />
    );
  }
};

export const Multiple: Story = {
  args: {
    options: specializations,
    placeholder: 'Специализация',
    'aria-label': 'Специализация'
  },
  render: function Render (args: SelectBaseProps) {
    const [value, setValue] = useState<string[]>(['frontend', 'qa', 'design']);

    return (
      <Select
        {...args}
        multiple
        withClearButton
        value={value}
        onValueChange={(nextValue, options) => {
          setValue(nextValue);
          onValueChange(nextValue, options);
        }}
      />
    );
  }
};

export const Disabled: Story = {
  args: {
    options: tariffs,
    'aria-label': 'Тариф',
    disabled: true,
    defaultValue: 'business'
  }
};

/** Асинхронный поиск: опции приходят снаружи, дебаунс — на стороне потребителя */
export const AsyncSearch: Story = {
  args: {
    placeholder: 'Ответственный',
    'aria-label': 'Ответственный',
    searchPlaceholder: 'Поиск сотрудника'
  },
  render: function Render (args: SelectBaseProps) {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<SelectOption[]>(employees.slice(0, 3));
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
    const [loading, setLoading] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const requestIdRef = useRef(0);

    useEffect(() => () => {
      clearTimeout(timerRef.current);
    }, []);

    const handleSearchChange = (query: string) => {
      clearTimeout(timerRef.current);
      setLoading(true);

      const requestId = ++requestIdRef.current;

      // Имитация запроса: дебаунс 300 мс + задержка ответа 600 мс
      timerRef.current = setTimeout(() => {
        setTimeout(() => {
          // Игнорируем устаревшие ответы
          if (requestId !== requestIdRef.current) return;

          setOptions(employees.filter((option) => includesQuery(option, query)));
          setLoading(false);
        }, 600);
      }, 300);
    };

    return (
      <Select
        {...args}
        multiple={false}
        searchable
        options={options}
        selectedOptions={selectedOption ? [selectedOption] : undefined}
        loading={loading}
        value={value}
        onSearchChange={handleSearchChange}
        onValueChange={(nextValue, option) => {
          setValue(nextValue);
          setSelectedOption(option);
          onValueChange(nextValue, option);
        }}
      />
    );
  }
};

export const CustomDropdownMenu: Story = {
  args: {
    placeholder: 'Статус проекта',
    'aria-label': 'Статус проекта'
  },
  render: function Render (args: SelectBaseProps) {
    const [value, setValue] = useState('');

    return (
      <Select
        {...args}
        multiple={false}
        value={value}
        selectedOptions={statuses}
        onValueChange={(nextValue) => {
          setValue(nextValue);
          onValueChange(nextValue);
        }}
        customDropdownMenu={({ query }) => (
          <>
            <SelectSearch placeholder="Поиск статуса" />
            {statuses.filter((option) => includesQuery(option, query)).map((option) => (
              <SelectOptionRow key={option.value} option={option} />
            ))}
          </>
        )}
      />
    );
  }
};

