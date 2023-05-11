import { useDir } from '@/app/hooks/useDir'
import { IDir } from '@/app/lib/types/dir'
import React, { createContext, ReactNode } from 'react'

type DirContextType = {
  dirs: IDir.IDirs[]
  isLoading: boolean
  fetch: (path: string, funcName: string) => Promise<unknown>
}

const DirContext = createContext<DirContextType>({
  dirs: [],
  isLoading: false,
  fetch: () => Promise.resolve(undefined),
})

export function DirContextProvider({ children }: { children: ReactNode }) {
  const { dirs, isLoading, fetch } = useDir()

  const contextValue = {
    dirs,
    isLoading,
    fetch,
  }

  return <DirContext.Provider value={contextValue}>{children}</DirContext.Provider>
}

export default DirContext
