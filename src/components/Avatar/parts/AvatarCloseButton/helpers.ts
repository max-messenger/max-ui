export const getButtonSize = (containerSize: number): number => {
  if (containerSize < 40) {
    return 12;
  } else if (containerSize < 54) {
    return 16;
  } else if (containerSize < 72) {
    return 20;
  } else {
    return 24;
  }
};
