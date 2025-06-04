import { useEffect, useRef, useState } from 'react';

import { isServer, noop } from '../helpers';

type SystemColorScheme = 'light' | 'dark';

interface Params {
  scheme?: SystemColorScheme
  listenChanges?: boolean
}

export const useSystemColorScheme = ({
  scheme = 'light',
  listenChanges
}: Params = {}): SystemColorScheme => {
  const matchMediaRef = useRef<MediaQueryList | null>(
    !isServer()
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null
  );

  const [colorScheme, setColorScheme] = useState<SystemColorScheme>(
    matchMediaRef.current
      ? matchMediaRef.current.matches
        ? 'dark'
        : 'light'
      : scheme
  );

  useEffect(() => {
    setColorScheme(() => matchMediaRef.current?.matches
      ? 'dark'
      : 'light'
    );

    if (!listenChanges) { return noop; }

    const handleSchemeChanged = (event: MediaQueryListEvent): void => {
      setColorScheme(() => event.matches
        ? 'dark'
        : 'light'
      );
    };

    matchMediaRef.current?.addEventListener('change', handleSchemeChanged);

    return () => {
      matchMediaRef.current?.removeEventListener('change', handleSchemeChanged);
    };
  }, [listenChanges]);

  return colorScheme;
};
