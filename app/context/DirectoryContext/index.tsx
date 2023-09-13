import { useDir } from '@/app/hooks/useDir'
import React, { createContext, ReactNode } from 'react'
import { DirContextType } from './DirectoryContext.type'

const DirContext = createContext<DirContextType>({
  dirs: [],
  isLoading: false,
  fetch: () => Promise.resolve(undefined),
  homePath: '/',
})

export function DirContextProvider({ children }: { children: ReactNode }) {
  const { dirs, isLoading, fetch, homePath } = useDir()

  const contextValue = {
    dirs,
    isLoading,
    fetch,
    homePath,
  }

  return <DirContext.Provider value={contextValue}>{children}</DirContext.Provider>
}

export default DirContext
