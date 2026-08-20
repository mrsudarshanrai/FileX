import { useDir } from '@/app/hooks/useDir';
import React, { createContext, ReactNode } from 'react';
import { DirContextType } from './DirectoryContextType';

const DirContext = createContext<DirContextType>({
  dirs: [],
  places: [],
  isLoading: false,
  fetch: () => Promise.resolve(undefined),
  homePath: '/',
});

export function DirContextProvider({ children }: { children: ReactNode }) {
  const { dirs, places, isLoading, fetch, homePath } = useDir();

  const contextValue = {
    dirs,
    places,
    isLoading,
    fetch,
    homePath,
  };

  return <DirContext.Provider value={contextValue}>{children}</DirContext.Provider>;
}

export default DirContext;
