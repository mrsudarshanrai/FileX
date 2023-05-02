import { useDir } from '@/app/hooks/useDir'
import { IDir } from '@/app/lib/types/dir'
import React, { createContext, ReactNode } from 'react'

type IinitialDirContext = {
  dirs: IDir.IDirs[]
  isLoading: boolean
  fetch: (path: string, funcName: string) => Promise<unknown>
}

const initialDirContext: IinitialDirContext = {
  dirs: [],
  isLoading: false,
  fetch: (path: string, funcName: string): Promise<unknown> => Promise.resolve(),
}

const DirContext = createContext<IinitialDirContext>(initialDirContext)

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
