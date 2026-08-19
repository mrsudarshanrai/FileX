import { useDir } from '@/app/hooks/useDir';
import React, { createContext, ReactNode } from 'react';
import { DirContextType } from './DirectoryContextType';

const DirContext = createContext<DirContextType>({
  dirs: [],
  placesDirs: [],
  isLoading: false,
  fetch: () => Promise.resolve(undefined),
  homePath: '/',
});

export function DirContextProvider({ children }: { children: ReactNode }) {
  const { dirs, placesDirs, isLoading, fetch, homePath } = useDir();

  const contextValue = {
    dirs,
    placesDirs,
    isLoading,
    fetch,
    homePath,
  };

  return <DirContext.Provider value={contextValue}>{children}</DirContext.Provider>;
}

export default DirContext;
