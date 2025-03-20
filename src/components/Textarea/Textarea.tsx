import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { type InnerClassNamesProp } from '../../types';
import styles from './Textarea.module.scss';

export type TextareaElementKey = 'textarea';
export type TextareaMode = 'primary' | 'secondary';

export interface TextareaProps extends ComponentProps<'textarea'> {
  mode?: TextareaMode
  innerClassNames?: InnerClassNamesProp<TextareaElementKey>
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, forwardedRef) => {
  const {
    className,
    innerClassNames,
    mode = 'primary',
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.Textarea,
    styles[`Textarea_mode_${mode}`],
    {
      [styles.Textarea_disabled]: rest.disabled
    },
    className
  );

  return (
    <div className={rootClassName}>
      <textarea
        ref={forwardedRef}
        className={clsx(styles.Textarea__textarea, innerClassNames?.textarea)}
        {...rest}
      />
    </div>
  );
});

Textarea.displayName = 'Textarea';
