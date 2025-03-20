declare module '*.svg' {
  import type * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;
  export default ReactComponent;
}

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}
