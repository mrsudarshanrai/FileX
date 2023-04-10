import { useDir } from '@/app/hooks/useDir'
import { IDir } from '@/app/lib/types/dir'
import React, { useCallback, useMemo, useState } from 'react'

type IinitialsDirContext = {
  dirs: IDir.IDirs[]
  isLoading: boolean
  fetch: (path: string, funcName: string) => Promise<unknown>
  currentPath: string
  setPath: (path: string) => void
}

const initialDirContext: IinitialsDirContext = {
  dirs: [],
  isLoading: false,
  fetch: (path: string, funcName: string): Promise<unknown> => Promise.resolve(),
  currentPath: '/home/popbob',
  setPath: (path: string) => {},
}

const DirContext = React.createContext<IinitialsDirContext>(initialDirContext)

export function DirContextProvider({ children }: { children: React.ReactNode }) {
  const { dirs, isLoading, fetch } = useDir()

  const [currentPath, setCurrentPath] = useState(initialDirContext.currentPath)

  /** sets current active path */
  const setPath = useCallback((path: string) => {
    setCurrentPath(path)
  }, [])

  const contextValue = useMemo(
    () => ({ dirs, isLoading, fetch, currentPath, setPath }),
    [dirs, isLoading, fetch, currentPath, setPath],
  )

  return <DirContext.Provider value={contextValue}>{children}</DirContext.Provider>
}

export default DirContext
