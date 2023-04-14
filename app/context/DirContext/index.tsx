import { useDir } from '@/app/hooks/useDir'
import { IDir } from '@/app/lib/types/dir'
import { getLastItemFromArray } from '@/app/utils'
import React, { useEffect, useState } from 'react'

type IinitialDirContext = {
  dirs: IDir.IDirs[]
  isLoading: boolean
  fetch: (path: string, funcName: string) => Promise<unknown>
  currentPath: string
  navigate: (step: number | string) => void
  isForwardDisabled: boolean
  isBackDisabled: boolean
}

const initialDirContext: IinitialDirContext = {
  dirs: [],
  isLoading: false,
  fetch: (path: string, funcName: string): Promise<unknown> => Promise.resolve(),
  currentPath: '/home/popbob',
  navigate: (step) => {},
  isForwardDisabled: false,
  isBackDisabled: false,
}

const DirContext = React.createContext<IinitialDirContext>(initialDirContext)

export function DirContextProvider({ children }: { children: React.ReactNode }) {
  const { dirs, isLoading, fetch } = useDir()

  const [currentPath, setCurrentPath] = useState(initialDirContext.currentPath)
  const [forwardStack, setForwardStack] = useState<string[]>([])
  const [backwardStack, setBackwardStack] = useState<string[]>([])

  const [navigationBtnStatus, setNavigationBtnStatus] = useState({
    isForwardDisabled: initialDirContext.isForwardDisabled,
    isBackDisabled: initialDirContext.isBackDisabled,
  })

  const pushToBackwardStack = (path: string) => setBackwardStack((stack) => [...stack, path])
  const pushToForwardStack = (path: string) => setForwardStack((stack) => [...stack, path])

  const disableForwardNavigation = () =>
    setNavigationBtnStatus((status) => ({ ...status, isForwardDisabled: true }))
  const disableBackNavigation = () =>
    setNavigationBtnStatus((status) => ({ ...status, isBackDisabled: true }))
  const enableForwardNavigation = () =>
    setNavigationBtnStatus((status) => ({ ...status, isForwardDisabled: false }))
  const enableBackNavigation = () =>
    setNavigationBtnStatus((status) => ({ ...status, isBackDisabled: false }))

  const navigate = (path: number | string) => {
    switch (path) {
      // backward navigation
      case -1: {
        if (backwardStack.length === 0 || currentPath === getLastItemFromArray(backwardStack)) {
          return
        }
        const backwardStackCopy = [...backwardStack]
        const poppedItem = backwardStackCopy.pop()
        setBackwardStack(backwardStackCopy)
        if (poppedItem) {
          pushToForwardStack(currentPath)
          setCurrentPath(poppedItem)
          fetch(poppedItem, 'get_files_in_path')
        }
        break
      }
      // forward navigation
      case 1: {
        if (forwardStack.length === 0 || currentPath === getLastItemFromArray(forwardStack)) {
          return
        }
        const forwardStackCopy = [...forwardStack]
        const poppedItem = forwardStackCopy.pop()
        setForwardStack(forwardStackCopy)
        if (poppedItem) {
          pushToBackwardStack(currentPath)
          setCurrentPath(poppedItem)
          fetch(poppedItem, 'get_files_in_path')
        }
        break
      }
      // default navigates to provided path string
      default:
        if (typeof path === 'string') {
          pushToBackwardStack(currentPath)
          setCurrentPath(path)
          fetch(path, 'get_files_in_path')
        }
        break
    }
  }

  useEffect(() => {
    if (forwardStack.length === 0) disableForwardNavigation()
    else enableForwardNavigation()

    if (backwardStack.length === 0) disableBackNavigation()
    else enableBackNavigation()
  }, [forwardStack.length, backwardStack.length])

  const contextValue = {
    dirs,
    isLoading,
    fetch,
    currentPath,
    navigate,
    isForwardDisabled: navigationBtnStatus.isForwardDisabled,
    isBackDisabled: navigationBtnStatus.isBackDisabled,
  }

  return <DirContext.Provider value={contextValue}>{children}</DirContext.Provider>
}

export default DirContext
