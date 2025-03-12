import { type MutableRefObject, type Ref, type RefCallback } from 'react';

export const mergeRefs = <T>(...inputRefs: Array<Ref<T> | undefined>): Ref<T> | RefCallback<T> => {
  const filteredInputRefs = inputRefs.filter(Boolean);

  if (filteredInputRefs.length <= 1) {
    const firstRef = filteredInputRefs[0];
    return firstRef ?? null;
  }

  return (ref) => {
    for (const inputRef of filteredInputRefs) {
      if (typeof inputRef === 'function') {
        inputRef(ref);
      } else if (inputRef) {
        (inputRef as MutableRefObject<T | null>).current = ref;
      }
    }
  };
};
