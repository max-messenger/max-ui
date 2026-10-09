import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, forwardRef, useEffect, useRef } from 'react';

import { hasReactNode, mergeRefs } from '../../../../helpers';
import { Icon16Check } from '../../../../icons';
import { useSelect } from '../../context';
import { type SelectOption } from '../../types';
import styles from './SelectOptionRow.module.scss';

export interface SelectOptionRowProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'onClick' | 'role'> {
  option: SelectOption
  /**
   * Позиция в списке: нужна для подсветки клавиатурой (активная строка) и связи через aria-activedescendant.
   * В customDropdownMenu можно не передавать — строка тогда просто выбирается кликом.
   */
  index?: number
}

export const SelectOptionRow = forwardRef<HTMLDivElement, SelectOptionRowProps>((props, forwardedRef) => {
  const { option, index, className, ...rest } = props;

  const {
    multiple,
    isSelected,
    select,
    activeIndex,
    setActiveIndex,
    getOptionId,
    innerClassNames
  } = useSelect();

  const rowRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);

  const selected = isSelected(option.value);
  const active = index !== undefined && activeIndex === index;

  // Активную строку, подсвеченную клавиатурой, прокручиваем в видимую область списка
  useEffect(() => {
    if (active && !hoveredRef.current) {
      rowRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [active]);

  const rootClassName = clsx(
    styles.SelectOptionRow,
    {
      [styles.SelectOptionRow_selected]: selected,
      [styles.SelectOptionRow_active]: active,
      [styles.SelectOptionRow_disabled]: option.disabled
    },
    innerClassNames?.option,
    className
  );

  return (
    <div
      ref={mergeRefs<HTMLDivElement>(rowRef, forwardedRef)}
      id={index === undefined ? undefined : getOptionId(index)}
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled || undefined}
      className={rootClassName}
      // Клик по строке не должен уводить фокус из поля или строки поиска
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onMouseMove={() => {
        hoveredRef.current = true;
        if (!option.disabled && index !== undefined && activeIndex !== index) setActiveIndex(index);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      onClick={() => {
        if (!option.disabled) select(option.value, option);
      }}
      {...rest}
    >
      {hasReactNode(option.before) && (
        <span className={clsx(styles.SelectOptionRow__before, innerClassNames?.optionBefore)}>
          {option.before}
        </span>
      )}

      <span className={clsx(styles.SelectOptionRow__label, innerClassNames?.optionLabel)}>
        {option.label}
      </span>

      {hasReactNode(option.hint) && (
        <span className={clsx(styles.SelectOptionRow__hint, innerClassNames?.optionHint)}>
          {option.hint}
        </span>
      )}

      {multiple && (
        <span className={clsx(styles.SelectOptionRow__check, innerClassNames?.optionCheck)}>
          {selected && <Icon16Check />}
        </span>
      )}
    </div>
  );
});

SelectOptionRow.displayName = 'SelectOptionRow';
