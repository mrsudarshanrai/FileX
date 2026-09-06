import { useDir } from '@/app/hooks/useDir';
import React, { createContext, ReactNode, useMemo } from 'react';
import { DirContextType } from './DirectoryContextType';

const DirContext = createContext<DirContextType>({
  dirs: [],
  places: [],
  isLoading: false,
  fetch: () => Promise.resolve(undefined),
  homePath: '/',
  trashPath: '',
  bookmarks: [],
  refreshBookmarks: () => Promise.resolve(),
  viewMode: 'icon',
  setViewMode: () => {},
  selectedPaths: new Set(),
  setSelectedPaths: () => {},
});

export function DirContextProvider({ children }: { children: ReactNode }) {
  const {
    dirs,
    places,
    isLoading,
    fetch,
    homePath,
    trashPath,
    bookmarks,
    refreshBookmarks,
    viewMode,
    setViewMode,
    selectedPaths,
    setSelectedPaths,
  } = useDir();

  const contextValue = useMemo(
    () => ({
      dirs,
      places,
      isLoading,
      fetch,
      homePath,
      trashPath,
      bookmarks,
      refreshBookmarks,
      viewMode,
      setViewMode,
      selectedPaths,
      setSelectedPaths,
    }),
    [
      dirs,
      places,
      isLoading,
      fetch,
      homePath,
      trashPath,
      bookmarks,
      refreshBookmarks,
      viewMode,
      setViewMode,
      selectedPaths,
      setSelectedPaths,
    ],
  );

  return <DirContext.Provider value={contextValue}>{children}</DirContext.Provider>;
}

export default DirContext;
