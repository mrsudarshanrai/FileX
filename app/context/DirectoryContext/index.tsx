import { useDir } from '@/app/hooks/useDir';
import React, { createContext, ReactNode } from 'react';
import { DirContextType } from './DirectoryContextType';

const DirContext = createContext<DirContextType>({
  dirs: [],
  places: [],
  isLoading: false,
  fetch: () => Promise.resolve(undefined),
  homePath: '/',
  activeDir: {},
  setActiveDir: () => {},
  viewMode: 'icon',
  setViewMode: () => {},
});

export function DirContextProvider({ children }: { children: ReactNode }) {
  const {
    dirs,
    places,
    isLoading,
    fetch,
    homePath,
    activeDir,
    setActiveDir,
    viewMode,
    setViewMode,
  } = useDir();

  const contextValue = {
    dirs,
    places,
    isLoading,
    fetch,
    homePath,
    activeDir,
    setActiveDir,
    viewMode,
    setViewMode,
  };

  return <DirContext.Provider value={contextValue}>{children}</DirContext.Provider>;
}

export default DirContext;
