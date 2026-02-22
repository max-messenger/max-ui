interface DispatchChangeNativeEventProps {
  el: HTMLElement
  value?: string
}

export const dispatchChangeNativeEvent = (props: DispatchChangeNativeEventProps): void => {
  const { el, value } = props;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const nativeValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  nativeValueSetter?.call(el, value);
  const event = new Event('input', { bubbles: true });
  el.dispatchEvent(event);
};
