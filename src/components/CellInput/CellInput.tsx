import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { hasReactNode } from '../../helpers';
import { type InnerClassNamesProp } from '../../types';
import { ClearableInput } from '../ClearableInput';
import { EllipsisText } from '../EllipsisText';
import styles from './CellInput.module.scss';

export type CellInputHeight = 'compact' | 'normal';
export type CellInputElementKey = 'before' | 'input' | 'clearButton' | 'body';

export interface CellInputProps extends ComponentProps<'input'> {
  height?: CellInputHeight
  before?: ReactNode
  innerClassNames?: InnerClassNamesProp<CellInputElementKey>
}

export const CellInput = forwardRef<HTMLInputElement, CellInputProps>((props, forwardedRef) => {
  const {
    className,
    height = 'normal',
    before,
    innerClassNames,
    disabled,
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.CellInput,
    styles[`CellInput_height_${height}`],
    {
      [styles.CellInput_disabled]: disabled
    },
    className
  );

  return (
    <label className={rootClassName}>
      {hasReactNode(before) && (
        <EllipsisText
          className={clsx(styles.CellInput__before, innerClassNames?.before)}
          maxLines={1}
        >
          {before}
        </EllipsisText>
      )}

      <ClearableInput
        ref={forwardedRef}
        className={clsx(styles.CellInput__body, innerClassNames?.body)}
        innerClassNames={{
          input: clsx(styles.CellInput__input, innerClassNames?.input),
          clearButton: clsx(styles.CellInput__clearButton, innerClassNames?.clearButton)
        }}
        type="text"
        disabled={disabled}
        {...rest}
      />
    </label>
  );
});

CellInput.displayName = 'CellInput';
