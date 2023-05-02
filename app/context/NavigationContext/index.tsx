import React, { useContext, useEffect, useState } from 'react'
import { getLastItemFromArray } from '@/app/utils'
import DirContext from '../DirContext'

type Props = {
  children: React.ReactNode
}

type InitialContext = {
  navigate: (path: number | string) => void
  currentPath: string
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>
  isForwardDisabled: boolean
  isBackDisabled: boolean
}

const initialContext: InitialContext = {
  navigate() {},
  currentPath: '/home/popbob',
  setCurrentPath: () => {},
  isForwardDisabled: false,
  isBackDisabled: false,
}

const NavigationContext = React.createContext<InitialContext>(initialContext)

const NavigationContextProvider = (props: Props) => {
  const { children } = props
  const { fetch } = useContext(DirContext)

  const [currentPath, setCurrentPath] = useState(initialContext.currentPath)
  /** all forward and backward paths */
  const [forwardStack, setForwardStack] = useState<string[]>([])
  const [backwardStack, setBackwardStack] = useState<string[]>([])

  const pushToBackwardStack = (path: string) => setBackwardStack((stack) => [...stack, path])
  const pushToForwardStack = (path: string) => setForwardStack((stack) => [...stack, path])

  const [navigationBtnStatus, setNavigationBtnStatus] = useState({
    isForwardDisabled: initialContext.isForwardDisabled,
    isBackDisabled: initialContext.isBackDisabled,
  })

  const disableForwardNavigation = () =>
    setNavigationBtnStatus((status) => ({ ...status, isForwardDisabled: true }))
  const disableBackNavigation = () =>
    setNavigationBtnStatus((status) => ({ ...status, isBackDisabled: true }))
  const enableForwardNavigation = () =>
    setNavigationBtnStatus((status) => ({ ...status, isForwardDisabled: false }))
  const enableBackNavigation = () =>
    setNavigationBtnStatus((status) => ({ ...status, isBackDisabled: false }))

  const navigate = (path: number | string) => {
    console.log(path)
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
