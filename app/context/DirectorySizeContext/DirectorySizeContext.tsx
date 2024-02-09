import { useDir } from '@/app/hooks/useDir'
import React, { createContext, ReactNode, useState } from 'react'
import { DirectorySizeContextType } from './DirectorySizeContextType'

const DirectorySizeContext = createContext<DirectorySizeContextType>({
  fileCount: 0,
  directorySize: 0,
  isFetching: false,
  setDirectorySizeFunc: () => {},
  setIsFetchingFunc: () => {},
})

export function DirectorySizeContextProvider({ children }: { children: ReactNode }) {
  const [directorySize, setDirectorySize] = useState({
    directorySize: 0,
    fileCount: 0,
  })

  const [isFetching, setIsFetching] = useState(false)

  const setDirectorySizeFunc = (size: number, fileCount: number) => {
    setDirectorySize({
      directorySize: size,
      fileCount,
    })
  }

  const setIsFetchingFunc = (fetching: boolean) => {
    setIsFetching(fetching)
  }

  const contextValue = {
    ...directorySize,
    isFetching,
    setDirectorySizeFunc,
    setIsFetchingFunc,
  }

  return (
    <DirectorySizeContext.Provider value={contextValue}>{children}</DirectorySizeContext.Provider>
  )
}

export default DirectorySizeContext
