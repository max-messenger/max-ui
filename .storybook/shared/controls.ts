export const selectControl = <T,>(options: readonly T[], labels?: Record<string, string>) => ({
  options,
  control: {
    type: options.length <= 3 ? 'radio' as const : 'select' as const,
    ...(labels ? { labels } : {})
  }
});

export const optionalControl = (options: Record<string, unknown>) =>
  selectControl(['None', ...Object.keys(options)]);

export const resolveOptionalControl = <T,>(
  options: Record<string, T>,
  value: unknown
): T | undefined => typeof value === 'string' ? options[value] : value as T;

export const reactNodeTextControl = {
  control: 'text' as const,
  table: {
    type: { summary: 'ReactNode' }
  }
};

export const optionalReactNodeControl = {
  control: 'boolean' as const,
  table: {
    type: { summary: 'ReactNode' }
  }
};

export const resolveOptionalReactNode = <T,>(value: unknown, content: T): T | undefined => {
  if (value === true) return content;
  if (value === false || value == null) return undefined;

  return value as T;
};
