type OnlineStatusSize = 'xs' | 's' | 'm' | 'l';

const onlineStatusSizeRanges: Array<{ maxExclusive: number, size: OnlineStatusSize }> = [
  { maxExclusive: 40, size: 'xs' },
  { maxExclusive: 52, size: 's' },
  { maxExclusive: 72, size: 'm' }
];

const getOnlineStatusSize = (avatarContainerSize: number): OnlineStatusSize => (
  onlineStatusSizeRanges.find(({ maxExclusive }) => avatarContainerSize < maxExclusive)?.size ?? 'l'
);

interface GetAvatarContainerStateOptions {
  size: number
  onlineStatus: boolean
  isCircle: boolean
}

export const getAvatarContainerState = ({
  size,
  onlineStatus,
  isCircle
}: GetAvatarContainerStateOptions) => {
  const normalizedSize = Number.isFinite(size) ? Math.min(200, Math.max(16, size)) : 40;

  return {
    normalizedSize,
    hasOnlineStatus: onlineStatus && isCircle && normalizedSize >= 24 && normalizedSize <= 80,
    onlineStatusSize: getOnlineStatusSize(normalizedSize)
  };
};
