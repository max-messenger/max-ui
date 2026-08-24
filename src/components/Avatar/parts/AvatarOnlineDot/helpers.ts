type DotContainerSize = 'xs' | 's' | 'm' | 'l';

const dotContainerSizeRanges: Array<{ maxExclusive: number, size: DotContainerSize }> = [
  { maxExclusive: 40, size: 'xs' },
  { maxExclusive: 52, size: 's' },
  { maxExclusive: 72, size: 'm' }
];

export const getDotContainerSize = (avatarContainerSize: number): DotContainerSize => (
  dotContainerSizeRanges.find(({ maxExclusive }) => avatarContainerSize < maxExclusive)?.size ?? 'l'
);

export const isOnlineStatusVisible = (avatarContainerSize: number): boolean => (
  avatarContainerSize >= 24
);
