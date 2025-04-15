import { type CSSProperties } from 'react';

type TextStyles = Pick<CSSProperties, 'fontSize'>;

// todo подумать насчет пропа для проброса кастомной функции
// todo уточнить у дизайна правила расчета значений
export const getTextStyles = (avatarContainerSize: number): TextStyles => {
  if (avatarContainerSize < 20) {
    return { fontSize: 6 };
  } else if (avatarContainerSize < 28) {
    return { fontSize: 8 };
  } else if (avatarContainerSize < 32) {
    return { fontSize: 10 };
  } else if (avatarContainerSize < 36) {
    return { fontSize: 11 };
  } else if (avatarContainerSize < 40) {
    return { fontSize: 13 };
  } else if (avatarContainerSize < 48) {
    return { fontSize: 14 };
  } else if (avatarContainerSize < 54) {
    return { fontSize: 17 };
  } else if (avatarContainerSize < 64) {
    return { fontSize: 18 };
  } else if (avatarContainerSize < 72) {
    return { fontSize: 21 };
  } else if (avatarContainerSize < 88) {
    return { fontSize: 26 };
  } else {
    return { fontSize: 30 };
  }
};
