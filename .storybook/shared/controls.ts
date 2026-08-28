export const selectControl = <T,>(options: readonly T[], labels?: Record<string, string>) => ({
  options,
  control: {
    type: options.length <= 3 ? 'radio' as const : 'select' as const,
    ...(labels ? { labels } : {})
  }
});

export const optionalControl = (options: Record<string, unknown>) =>
  selectControl(['none', ...Object.keys(options)]);

export const resolveOptionalControl = <TValue,>(
  options: Record<string, TValue>,
  value: unknown
): TValue | undefined => typeof value === 'string' ? options[value] : value as TValue;

export const reactNodeTextControl = {
  control: 'text' as const,
  table: {
    type: { summary: 'ReactNode' }
  }
};
