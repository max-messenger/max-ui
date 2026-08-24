import {
  AvatarCloseButton,
  AvatarContainer,
  AvatarIcon,
  AvatarImage,
  AvatarOverlay,
  AvatarText
} from './parts';

const AvatarNamespace = Object.assign({}, {
  Container: AvatarContainer,
  Image: AvatarImage,
  Overlay: AvatarOverlay,
  Icon: AvatarIcon,
  Text: AvatarText,
  CloseButton: AvatarCloseButton
});

export { AvatarNamespace as Avatar };
export type { AvatarCloseButtonProps, AvatarContainerElementKey, AvatarContainerFrom, AvatarContainerProps, AvatarContainerSize, AvatarIconProps, AvatarImageProps, AvatarOverlayProps, AvatarTextGradient, AvatarTextProps } from './parts';
