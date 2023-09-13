import { useDir } from '@/app/hooks/useDir'
import { IDir } from '@/app/lib/types/dir'
import React, { createContext, ReactNode } from 'react'

type DirContextType = {
  dirs: IDir.IDirs[]
  isLoading: boolean
  fetch: (path: string, funcName: string) => Promise<unknown>
  homePath: string
}

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
