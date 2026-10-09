import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../../../helpers';
import { Icon16Chevron, Icon16CloseIos } from '../../../../icons';
import { EllipsisText, SvgButton } from '../../../../internal';
import { type InnerClassNamesProp } from '../../../../types';
import { type SelectElementKey, type SelectMode, type SelectSize } from '../../types';
import styles from './SelectField.module.scss';

export interface SelectFieldProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  mode: SelectMode
  size: SelectSize
  open: boolean
  disabled?: boolean
  iconBefore?: ReactNode
  /** Подпись выбранного значения; если пусто — показывается placeholder */
  valueContent?: ReactNode
  placeholder?: ReactNode
  /** Сколько значений скрыто за первым (multiple); 0 — счётчик не показывается */
  hiddenCount?: number
  /** id блока со значением: используется в aria-labelledby поля */
  valueId?: string
  showClearButton: boolean
  onClear: () => void
  innerClassNames?: InnerClassNamesProp<SelectElementKey>
}

export const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>((props, forwardedRef) => {
  const {
    className,
    mode,
    size,
    open,
    disabled,
    iconBefore,
    valueContent,
    placeholder,
    hiddenCount = 0,
    valueId,
    showClearButton,
    onClear,
    innerClassNames,
    ...rest
  } = props;

  const hasValue = hasReactNode(valueContent);

  const rootClassName = clsx(
    styles.SelectField,
    styles[`SelectField_mode_${mode}`],
    styles[`SelectField_size_${size}`],
    {
      [styles.SelectField_disabled]: disabled,
      [styles.SelectField_open]: open
    },
    innerClassNames?.field,
    className
  );

  return (
    <div
      ref={forwardedRef}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={rootClassName}
      {...rest}
    >
      {hasReactNode(iconBefore) && (
        <div className={clsx(styles.SelectField__iconBefore, innerClassNames?.iconBefore)}>
          {iconBefore}
        </div>
      )}

      <EllipsisText
        id={valueId}
        className={clsx(
          styles.SelectField__value,
          { [styles.SelectField__value_placeholder]: !hasValue },
          innerClassNames?.value
        )}
      >
        {hasValue ? valueContent : placeholder}
      </EllipsisText>

      {hiddenCount > 0 && (
        <span className={clsx(styles.SelectField__counter, innerClassNames?.counter)}>
          {`+${hiddenCount}`}
        </span>
      )}

      {showClearButton && !disabled && (
        <SvgButton
          type="button"
          tabIndex={-1}
          className={clsx(styles.SelectField__clearButton, innerClassNames?.clearButton)}
          aria-label="Очистить"
          // Фокус остаётся на поле, а клик не должен открывать/закрывать панель
          onMouseDown={(event) => {
            event.preventDefault();
          }}
          onClick={(event) => {
            event.stopPropagation();
            onClear();
          }}
        >
          <Icon16CloseIos />
        </SvgButton>
      )}

      <Icon16Chevron
        aria-hidden
        className={clsx(
          styles.SelectField__chevron,
          { [styles.SelectField__chevron_open]: open },
          innerClassNames?.chevron
        )}
      />
    </div>
  );
});

SelectField.displayName = 'SelectField';
