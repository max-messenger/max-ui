import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { hasReactNode } from '../../helpers';
import { Icon16Chevron } from '../../icons';
import { type InnerClassNamesProp } from '../../types';
import { CellList } from '../CellList';
import { CellSimple } from '../CellSimple';
import { EllipsisText } from '../EllipsisText';
import maxUIStyles from '../MaxUI/MaxUI.module.scss';
import { useAppearance } from '../MaxUI/MaxUIContext';
import { Tappable } from '../Tappable';
import styles from './CellDropdown.module.scss';

export type CellDropdownHeight = 'compact' | 'normal';
export type CellDropdownElementKey = 'before' | 'trigger' | 'chevron' | 'body' | 'dropdown';

export interface DropdownOption {
  key: string | number
  title: string
  subtitle?: ReactNode
  overline?: ReactNode
}

export interface CellDropdownProps extends Omit<ComponentProps<'div'>, 'onChange' | 'value'> {
  height?: CellDropdownHeight
  before?: ReactNode
  options: DropdownOption[]
  value?: string | number
  onChange?: (value: string | number) => void
  showChevron?: boolean
  placeholder?: string
  innerClassNames?: InnerClassNamesProp<CellDropdownElementKey>
  disabled?: boolean
}

export const CellDropdown = forwardRef<HTMLDivElement, CellDropdownProps>((props, forwardedRef) => {
  const {
    className,
    height = 'normal',
    before,
    options,
    value,
    onChange,
    showChevron = false,
    placeholder = '',
    innerClassNames,
    disabled = false,
    ...rest
  } = props;

  const { platform, colorScheme } = useAppearance();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.key === value);
  const displayValue = selectedOption?.title ?? '';
  const hasValue = selectedOption !== undefined;

  const handleToggle = (): void => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (optionKey: string | number): void => {
    onChange?.(optionKey);
    setIsOpen(false);
  };

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const rootClassName = clsx(
    styles.CellDropdown,
    styles[`CellDropdown_height_${height}`],
    {
      [styles.CellDropdown_disabled]: disabled
    },
    className
  );

  return (
    <>
      <div ref={containerRef} className={rootClassName} {...rest}>
        {hasReactNode(before) && (
          <EllipsisText
            className={clsx(styles.CellDropdown__before, innerClassNames?.before)}
            maxLines={1}
          >
            {before}
          </EllipsisText>
        )}

        <Tappable
          ref={forwardedRef}
          className={clsx(styles.CellDropdown__body, innerClassNames?.body)}
          onClick={handleToggle}
          disabled={disabled}
        >
          <div
            className={clsx(
              styles.CellDropdown__trigger,
              {
                [styles.CellDropdown__trigger_empty]: !hasValue
              },
              innerClassNames?.trigger
            )}
          >
            <EllipsisText maxLines={1}>
              {displayValue || placeholder}
            </EllipsisText>
          </div>

          {showChevron && (
            <Icon16Chevron className={clsx(styles.CellDropdown__chevron, innerClassNames?.chevron)} />
          )}
        </Tappable>
      </div>

      {isOpen &&
        createPortal(
          <>
            <div
              ref={overlayRef}
              className={styles.CellDropdown__overlay}
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <div
              ref={dropdownRef}
              className={clsx(
                maxUIStyles.MaxUI,
                maxUIStyles[`MaxUI_platform_${platform}`],
                maxUIStyles[`MaxUI_colorScheme_${colorScheme}`],
                styles.CellDropdown__dropdown,
                innerClassNames?.dropdown
              )}
              style={{
                top: containerRef.current
                  ? containerRef.current.getBoundingClientRect().bottom
                  : 0,
                left: containerRef.current
                  ? containerRef.current.getBoundingClientRect().left
                  : 0,
                width: containerRef.current?.getBoundingClientRect().width ?? 'auto'
              }}
            >
              <CellList mode="island" filled>
                {options.map((option) => (
                  <CellSimple
                    key={option.key}
                    title={option.title}
                    subtitle={option.subtitle}
                    overline={option.overline}
                    height={height}
                    onClick={() => {
                      handleSelect(option.key);
                    }}
                  />
                ))}
              </CellList>
            </div>
          </>,
          document.body
        )}
    </>
  );
});

CellDropdown.displayName = 'CellDropdown';
