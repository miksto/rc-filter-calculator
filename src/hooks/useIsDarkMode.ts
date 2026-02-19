import { useSyncExternalStore } from 'react';

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function subscribe(callback: () => void) {
  darkModeQuery.addEventListener('change', callback);
  return () => darkModeQuery.removeEventListener('change', callback);
}

export function useIsDarkMode(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => darkModeQuery.matches,
    () => true,
  );
}
