import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode, useCallback } from 'react';

import { hasReactNode, mergeRefs } from '../../helpers';
import { Icon16Check } from '../../icons';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  label?: ReactNode
  caption?: ReactNode
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, forwardedRef) => {
  const {
    label,
    caption,
    indeterminate = false,
    disabled,
    className,
    ...rest
  } = props;

  const hasLabel = hasReactNode(label);
  const hasCaption = hasReactNode(caption);
  const hasContent = hasLabel || hasCaption;
  const Root = hasContent ? 'label' : 'span';

  const setIndeterminate = useCallback((node: HTMLInputElement | null) => {
    if (node) node.indeterminate = indeterminate;
  }, [indeterminate]);

  const rootClassName = clsx(
    styles.Checkbox,
    styles.Checkbox_animated,
    {
      [styles.Checkbox_indeterminate]: indeterminate,
      [styles.Checkbox_disabled]: disabled
    },
    className
  );

  return (
    <Root className={rootClassName}>
      <span className={styles.Checkbox__control}>
        <input
          {...rest}
          ref={mergeRefs(forwardedRef, setIndeterminate)}
          type="checkbox"
          disabled={disabled}
          aria-checked={indeterminate ? 'mixed' : undefined}
          className={styles.Checkbox__input}
        />

        <span className={styles.Checkbox__box}>
          <Icon16Check className={styles.Checkbox__icon} />
        </span>
      </span>

      {hasContent && (
        <span className={styles.Checkbox__content}>
          {hasLabel && <span className={styles.Checkbox__label}>{label}</span>}
          {hasCaption && <span className={styles.Checkbox__caption}>{caption}</span>}
        </span>
      )}
    </Root>
  );
});

Checkbox.displayName = 'Checkbox';
