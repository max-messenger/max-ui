export const isIos = (): boolean => {
  return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
};
