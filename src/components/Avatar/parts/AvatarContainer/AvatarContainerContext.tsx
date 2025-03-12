import { createContext, useContext } from 'react';

import { type AvatarContainerSize } from './AvatarContainer';

export interface AvatarContainerContextInterface {
  size: AvatarContainerSize
}

export const AvatarContainerContext = createContext<AvatarContainerContextInterface>({
  size: 48
});

export const useAvatarContainerContext = (): AvatarContainerContextInterface => useContext(AvatarContainerContext);
