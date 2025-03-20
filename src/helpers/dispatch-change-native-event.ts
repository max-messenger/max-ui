export const dispatchChangeNativeEvent = (el: HTMLElement, value: string = ''): void => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const nativeValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  nativeValueSetter?.call(el, value);
  const event = new Event('input', { bubbles: true });
  el.dispatchEvent(event);
};
