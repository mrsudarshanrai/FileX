import { useDir } from '@/app/hooks/useDir'
import { IDir } from '@/app/lib/types/dir'
import { getLastItemFromArray } from '@/app/utils'
import React, { useState } from 'react'

type IinitialDirContext = {
  dirs: IDir.IDirs[]
  isLoading: boolean
  fetch: (path: string, funcName: string) => Promise<unknown>
  currentPath: string
  forwardStack: string[]
  backwardStack: string[]
  navigate: (step: number | string) => void
}

const initialDirContext: IinitialDirContext = {
  dirs: [],
  isLoading: false,
  fetch: (path: string, funcName: string): Promise<unknown> => Promise.resolve(),
  currentPath: '/home/popbob',
  forwardStack: [],
  backwardStack: [],
  navigate: (step) => {},
}

const DirContext = React.createContext<IinitialDirContext>(initialDirContext)

export function DirContextProvider({ children }: { children: React.ReactNode }) {
  const { dirs, isLoading, fetch } = useDir()

  const [currentPath, setCurrentPath] = useState(initialDirContext.currentPath)
  const [forwardStack, setForwardStack] = useState(initialDirContext.forwardStack)
  const [backwardStack, setBackwardStack] = useState(initialDirContext.backwardStack)

  const pushToBackwardStack = (path: string) => setBackwardStack((stack) => [...stack, path])
  const pushToForwardStack = (path: string) => setForwardStack((stack) => [...stack, path])

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

  const contextValue = { dirs, isLoading, fetch, currentPath, navigate }

  return <DirContext.Provider value={contextValue}>{children}</DirContext.Provider>
}

export default DirContext
