import { clsx } from 'clsx';
import { type ComponentProps, forwardRef, type MouseEventHandler } from 'react';

import { Icon20CloseFilled } from '../../../../icons';
import { SvgButton } from '../../../SvgButton';
import { useAvatarContainerContext } from '../AvatarContainer/AvatarContainerContext';
import styles from './AvatarCloseButton.module.scss';
import { getButtonSize } from './helpers';

export interface AvatarCloseButtonProps extends ComponentProps<'button'> {}

export const AvatarCloseButton = forwardRef<HTMLButtonElement, AvatarCloseButtonProps>((props, forwardedRef) => {
  const {
    className,
    onClick,
    ...rest
  } = props;

  const { size: containerSize } = useAvatarContainerContext();

  const buttonSize = getButtonSize(containerSize);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick?.(e);
  };

  return (
    <SvgButton
      ref={forwardedRef}
      className={clsx(styles.AvatarCloseButton, className)}
      onClick={clickHandler}
      {...rest}
    >
      <Icon20CloseFilled width={buttonSize} height={buttonSize} />
    </SvgButton>
  );
});

AvatarCloseButton.displayName = 'AvatarCloseButton';
