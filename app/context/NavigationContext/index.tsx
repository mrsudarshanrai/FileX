import React, { useContext, useEffect, useState } from 'react'
import { getLastItemFromArray } from '@/app/utils'
import DirContext from '../DirContext'

type Props = {
  children: React.ReactNode
}

type NavigationContextType = {
  navigate: (path: number | string) => void
  currentPath: string
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>
  isForwardDisabled: boolean
  isBackDisabled: boolean
}

const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined)

const NavigationContextProvider = (props: Props) => {
  const { children } = props
  const { fetch } = useContext(DirContext)

  const [currentPath, setCurrentPath] = useState('/home/popbob')
  /** all forward and backward paths */
  const [forwardStack, setForwardStack] = useState<string[]>([])
  const [backwardStack, setBackwardStack] = useState<string[]>([])

  const pushToBackwardStack = (path: string) => setBackwardStack((stack) => [...stack, path])
  const pushToForwardStack = (path: string) => setForwardStack((stack) => [...stack, path])

  const [navigationBtnStatus, setNavigationBtnStatus] = useState({
    isForwardDisabled: false,
    isBackDisabled: false,
  })

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
    setNavigationBtnStatus({
      isForwardDisabled: forwardStack.length === 0,
      isBackDisabled: backwardStack.length === 0,
    })
  }, [forwardStack.length, backwardStack.length])

  const contextValue = {
    navigate,
    currentPath,
    setCurrentPath,
    isForwardDisabled: navigationBtnStatus.isForwardDisabled,
    isBackDisabled: navigationBtnStatus.isBackDisabled,
  }

  return <NavigationContext.Provider value={contextValue}>{children}</NavigationContext.Provider>
}

export default NavigationContextProvider
export { NavigationContext }
