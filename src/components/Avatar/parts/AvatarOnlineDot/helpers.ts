export const getDotContainerSize = (avatarContainerSize: number): 'xs' | 's' | 'm' | 'l' => {
  if (avatarContainerSize < 40) {
    return 'xs';
  } else if (avatarContainerSize < 54) {
    return 's';
  } else if (avatarContainerSize < 72) {
    return 'm';
  } else {
    return 'l';
  }
};

export const isOnlineStatusVisible = (avatarContainerSize: number): boolean => (
  avatarContainerSize >= 24 && avatarContainerSize <= 80
);
