import { Slottable } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type ReactNode } from 'react';

import { getSubtree, hasReactNode } from '../../helpers';
import { Icon16Chevron } from '../../icons';
import { type AsChildProp, type InnerClassNamesProp, type MergeProps } from '../../types';
import { Tappable } from '../Tappable';
import styles from './CellAction.module.scss';

export type CellActionMode = 'primary' | 'destructive' | 'custom';
export type CellActionHeight = 'compact' | 'normal';
export type CellActionInnerElementKey = 'before' | 'chevron' | 'content';

interface CellActionOwnProps extends AsChildProp {
  mode?: CellActionMode
  height?: CellActionHeight
  before?: ReactNode
  showChevron?: boolean
  innerClassNames?: InnerClassNamesProp<CellActionInnerElementKey>
}

export type CellActionProps = MergeProps<ComponentProps<'button'>, CellActionOwnProps>;

export const CellAction = forwardRef<HTMLButtonElement, CellActionProps>((props, forwardedRef) => {
  const {
    className,
    before,
    children,
    innerClassNames,
    asChild = false,
    mode = 'primary',
    height = 'normal',
    showChevron = false,
    ...rest
  } = props;

  const rootClassName = clsx(
    styles.CellAction,
    styles[`CellAction_mode_${mode}`],
    styles[`CellAction_height_${height}`],
    {
      [styles.CellAction_disabled]: rest.disabled
    },
    className
  );

  return (
    <Tappable
      ref={forwardedRef}
      className={rootClassName}
      asChild={asChild}
      as="button"
      parentChildren={children}
      {...rest}
    >
      {hasReactNode(before) && (
        <span className={clsx(styles.CellAction__before, innerClassNames?.before)}>
          {before}
        </span>
      )}

      <Slottable>
        {getSubtree({ asChild, children }, (children) => (
          <span key="subtree-container" className={clsx(styles.CellAction__content, innerClassNames?.content)}>
            {children}
          </span>
        ))}
      </Slottable>

      {showChevron && (
        <Icon16Chevron className={clsx(styles.CellAction__chevron, innerClassNames?.chevron)} />
      )}
    </Tappable>
  );
});

CellAction.displayName = 'CellAction';
