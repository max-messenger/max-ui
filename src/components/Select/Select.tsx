import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  size as sizeMiddleware,
  useClick,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react';
import { clsx } from 'clsx';
import {
  type FocusEvent,
  forwardRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from 'react';

import { hasReactNode, mergeRefs } from '../../helpers';
import { SelectContext, type SelectContextInterface } from './context';
import {
  COLLISION_PADDING,
  DEFAULT_EMPTY_TEXT,
  DEFAULT_SEARCH_PLACEHOLDER,
  defaultFilterOption,
  DROPDOWN_OFFSET,
  EMPTY_OPTIONS,
  findEnabledIndex,
  toValuesArray
} from './helpers';
import { useSelectNavigation } from './hooks';
import { SelectContent } from './parts/SelectContent';
import { SelectField } from './parts/SelectField';
import { SelectOptions } from './parts/SelectOptions';
import { SelectSearch } from './parts/SelectSearch';
import styles from './Select.module.scss';
import { type SelectBaseProps, type SelectDropdownApi, type SelectOption, type SelectProps, type SelectValue } from './types';

type SelectInternalProps = SelectBaseProps & {
  multiple?: boolean
  value?: SelectValue
  defaultValue?: SelectValue
  onValueChange?: (value: any, options: any) => void
};

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, forwardedRef) => {
  const {
    options = EMPTY_OPTIONS,
    customDropdownMenu,
    selectedOptions,
    searchable = false,
    searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
    filterOption,
    onSearchChange,
    loading = false,
    emptyText = DEFAULT_EMPTY_TEXT,
    placeholder,
    disabled = false,
    mode = 'default',
    size = 'large',
    hint,
    iconBefore,
    withClearButton = false,
    name,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    placement = 'bottom-start',
    dropdownWidth = 'trigger',
    innerClassNames,
    multiple: multipleProp,
    value: controlledValue,
    defaultValue,
    onValueChange,
    onKeyDown: onFieldKeyDown,
    onFocus: onFieldFocus,
    onBlur: onFieldBlur,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    ...rest
  } = props as SelectInternalProps;

  const multiple = Boolean(multipleProp);
  const baseId = useId();
  const listId = `${baseId}-listbox`;
  const valueId = `${baseId}-value`;
  const hintId = `${baseId}-hint`;
  const fieldId = rest.id ?? `${baseId}-field`;
  const getOptionId = useCallback((index: number) => `${baseId}-option-${index}`, [baseId]);

  // [Value] controlled / uncontrolled
  const isValueControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<SelectValue | undefined>(defaultValue);
  const currentValue = isValueControlled ? controlledValue : uncontrolledValue;
  const selectedValues = useMemo(() => toValuesArray(currentValue), [currentValue]);

  // Кэш всех виденных опций: при асинхронном поиске выбранной опции может уже не быть в `options`,
  // а подпись выбранного значения в поле должна сохраняться
  const knownOptionsRef = useRef(new Map<string, SelectOption>());
  for (const key of knownOptionsRef.current.keys()) {
    if (!selectedValues.includes(key)) knownOptionsRef.current.delete(key);
  }
  for (const option of options) knownOptionsRef.current.set(option.value, option);
  if (selectedOptions) {
    for (const option of selectedOptions) knownOptionsRef.current.set(option.value, option);
  }

  const getSelectedOptions = (values: string[]): SelectOption[] => {
    return values.map((item) => knownOptionsRef.current.get(item) ?? { value: item, label: item });
  };

  // [Open] controlled / uncontrolled
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpenControlled = controlledOpen !== undefined;
  const open = !disabled && (isOpenControlled ? Boolean(controlledOpen) : uncontrolledOpen);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (!isOpenControlled) setUncontrolledOpen(nextOpen);

    onOpenChange?.(nextOpen);
  }, [isOpenControlled, onOpenChange]);

  useEffect(() => {
    if (disabled && (isOpenControlled ? controlledOpen : uncontrolledOpen)) handleOpenChange(false);
  }, [disabled]);

  // [Search]
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const changeQuery = useCallback((nextQuery: string) => {
    setQuery(nextQuery);
    onSearchChange?.(nextQuery);
  }, [onSearchChange]);

  const filteredOptions = useMemo(() => {
    if (customDropdownMenu !== undefined) return EMPTY_OPTIONS;
    if (!searchable || query.trim() === '') return options;
    if (filterOption) return options.filter((option) => filterOption(option, query));
    // Задан onSearchChange — опции уже отфильтрованы снаружи
    if (onSearchChange) return options;

    return options.filter((option) => defaultFilterOption(option, query));
  }, [customDropdownMenu, searchable, query, options, filterOption, onSearchChange]);

  const filteredOptionsKey = filteredOptions.map((option) => option.value).join('\u0000');

  // Подсвеченная опция могла исчезнуть или стать недоступной после смены списка
  const safeActiveIndex = activeIndex !== null && filteredOptions[activeIndex] && !filteredOptions[activeIndex].disabled
    ? activeIndex
    : null;

  // [Floating]
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement,
    strategy: 'fixed',
    middleware: [
      offset(DROPDOWN_OFFSET),
      flip({ padding: COLLISION_PADDING }),
      sizeMiddleware({
        padding: COLLISION_PADDING,
        apply ({ rects, availableHeight, elements }) {
          elements.floating.style.setProperty('--MaxUi-Select_trigger-width', `${rects.reference.width}px`);
          elements.floating.style.setProperty('--MaxUi-Select_available-height', `${availableHeight}px`);
        }
      }),
      shift({ padding: COLLISION_PADDING })
    ],
    whileElementsMounted: autoUpdate
  });

  // Enter/Space/стрелки обрабатывает useSelectNavigation: в открытой панели они выбирают опцию
  const click = useClick(context, { enabled: !disabled, toggle: true, keyboardHandlers: false });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const focusField = useCallback(() => {
    (refs.domReference.current as HTMLElement | null)?.focus();
  }, [refs]);

  const close = useCallback((restoreFocus: boolean) => {
    handleOpenChange(false);

    if (restoreFocus) focusField();
  }, [handleOpenChange, focusField]);

  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      return;
    }

    setActiveIndex(null);

    if (query !== '') {
      setQuery('');
      onSearchChange?.('');
    }

    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;

    if (document.activeElement === document.body) focusField();
  }, [open]);

  // При открытии подсвечиваем уже выбранную опцию
  useEffect(() => {
    if (!open) return;

    const selectedIndex = filteredOptions.findIndex((option) => !option.disabled && selectedValues.includes(option.value));

    setActiveIndex(selectedIndex === -1 ? null : selectedIndex);
  }, [open]);

  // При вводе в поиск подсвечиваем первое совпадение, чтобы Enter сразу выбирал его
  useEffect(() => {
    if (!open || query === '') return;

    const firstIndex = findEnabledIndex(filteredOptions, -1, 1);

    setActiveIndex(firstIndex === -1 ? null : firstIndex);
  }, [query, filteredOptionsKey]);

  // [Selection]
  const commit = (nextValues: string[]) => {
    const nextValue: SelectValue = multiple ? nextValues : (nextValues[0] ?? '');

    if (!isValueControlled) setUncontrolledValue(nextValue);

    if (multiple) {
      onValueChange?.(nextValues, getSelectedOptions(nextValues));
    } else {
      onValueChange?.(nextValue, getSelectedOptions(nextValues)[0] ?? null);
    }
  };

  const select = (itemValue: string, option?: SelectOption) => {
    if (option) knownOptionsRef.current.set(itemValue, option);

    if (multiple) {
      commit(selectedValues.includes(itemValue)
        ? selectedValues.filter((item) => item !== itemValue)
        : [...selectedValues, itemValue]);
      return;
    }

    if (selectedValues[0] !== itemValue) commit([itemValue]);

    close(true);
  };

  const isSelected = (itemValue: string) => selectedValues.includes(itemValue);

  const canClear = withClearButton && selectedValues.length > 0;
  const clear = () => {
    commit([]);
  };

  // [Keyboard]
  const onNavigationKeyDown = useSelectNavigation({
    open,
    options: filteredOptions,
    activeIndex: safeActiveIndex,
    setActiveIndex,
    onSelectIndex: (index) => {
      select(filteredOptions[index].value, filteredOptions[index]);
    },
    onOpen: () => {
      handleOpenChange(true);
    },
    onClose: close,
    onClear: canClear ? clear : undefined
  });

  // Переходы фокуса между полем и панелью — не blur/focus для потребителя
  const isInsidePanel = (node: EventTarget | null) => {
    return node instanceof Node && Boolean(refs.floating.current?.contains(node));
  };

  const handleFieldFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!isInsidePanel(event.relatedTarget)) onFieldFocus?.(event);
  };

  const handleFieldBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!isInsidePanel(event.relatedTarget)) onFieldBlur?.(event);
  };

  const handlePanelBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    const isInsideField = next instanceof Node && Boolean(refs.domReference.current?.contains(next));

    if (!isInsidePanel(next) && !isInsideField) onFieldBlur?.(event as unknown as FocusEvent<HTMLDivElement>);
  };

  const handleFieldKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onFieldKeyDown?.(event);

    if (!event.defaultPrevented) onNavigationKeyDown(event);
  };

  // [Context]
  const closeAndFocus = () => {
    close(true);
  };

  const contextValue: SelectContextInterface = {
    multiple,
    query,
    setQuery: changeQuery,
    isSelected,
    select,
    close: closeAndFocus,
    options: filteredOptions,
    listId,
    getOptionId,
    activeIndex: safeActiveIndex,
    setActiveIndex,
    onKeyDown: onNavigationKeyDown,
    emptyText,
    loading,
    listLabel: ariaLabelledby
      ? { 'aria-labelledby': ariaLabelledby }
      : { 'aria-label': ariaLabel ?? (typeof placeholder === 'string' ? placeholder : undefined) },
    innerClassNames
  };

  const dropdownApi: SelectDropdownApi = {
    query,
    multiple,
    isSelected,
    select,
    close: closeAndFocus
  };

  // [Render]
  const [firstSelectedOption] = getSelectedOptions(selectedValues);
  const valueContent: ReactNode = selectedValues.length > 0
    ? (firstSelectedOption?.label ?? selectedValues[0])
    : undefined;

  const isCustomDropdown = customDropdownMenu !== undefined;
  const hasSearchInPanel = searchable && !isCustomDropdown;

  const dropdownContent = isCustomDropdown
    ? (typeof customDropdownMenu === 'function' ? customDropdownMenu(dropdownApi) : customDropdownMenu)
    : <SelectOptions />;

  // Если поиска в панели нет, виртуальный фокус живёт на самом поле
  const activeDescendant = open && !hasSearchInPanel && safeActiveIndex !== null
    ? getOptionId(safeActiveIndex)
    : undefined;

  // Имя поля: лейбл (aria-label / aria-labelledby) + отображаемое значение
  const fieldLabelledby = ariaLabelledby
    ? `${ariaLabelledby} ${valueId}`
    : (ariaLabel ? `${fieldId} ${valueId}` : valueId);
  const fieldDescribedby = [ariaDescribedby, hasReactNode(hint) ? hintId : undefined]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={clsx(styles.Select, innerClassNames?.container)}>
      <SelectField
        ref={mergeRefs<HTMLDivElement>(forwardedRef, refs.setReference)}
        id={fieldId}
        valueId={valueId}
        aria-label={ariaLabel}
        aria-labelledby={fieldLabelledby}
        aria-describedby={fieldDescribedby}
        mode={mode}
        size={size}
        open={open}
        disabled={disabled}
        iconBefore={iconBefore ?? (multiple ? undefined : firstSelectedOption?.before)}
        valueContent={valueContent}
        placeholder={placeholder}
        hiddenCount={multiple ? Math.max(selectedValues.length - 1, 0) : 0}
        showClearButton={canClear}
        onClear={clear}
        innerClassNames={innerClassNames}
        aria-controls={open && !isCustomDropdown ? listId : undefined}
        aria-activedescendant={activeDescendant}
        {...getReferenceProps({
          ...rest,
          onKeyDown: handleFieldKeyDown,
          onFocus: handleFieldFocus,
          onBlur: handleFieldBlur
        })}
      />

      {hasReactNode(hint) && (
        <div
          id={hintId}
          className={clsx(
            styles.Select__hint,
            { [styles.Select__hint_disabled]: disabled },
            innerClassNames?.hint
          )}
        >
          {hint}
        </div>
      )}

      {name && !disabled && selectedValues.map((item) => (
        <input
          key={item}
          type="hidden"
          name={name}
          value={item}
        />
      ))}

      {open && (
        <FloatingPortal>
          <SelectContext.Provider value={contextValue}>
            <SelectContent
              ref={refs.setFloating}
              style={floatingStyles}
              dropdownWidth={dropdownWidth}
              className={clsx(innerClassNames?.content)}
              header={hasSearchInPanel ? <SelectSearch placeholder={searchPlaceholder} /> : undefined}
              {...getFloatingProps({
                onBlur: handlePanelBlur,
                // Клик по панели не должен уводить фокус с поля или строки поиска
                onMouseDown: (event: MouseEvent<HTMLElement>) => {
                  if (!(event.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) {
                    event.preventDefault();
                  }
                }
              })}
            >
              {dropdownContent}
            </SelectContent>
          </SelectContext.Provider>
        </FloatingPortal>
      )}
    </div>
  );
});

Select.displayName = 'Select';
