import React, { useEffect, useState } from 'react'
import ContextMenuComponent from '@/app/components/ContextMenu'
import { Display, DisplayEnum } from '@/app/components/ContextMenu/contextmenu.types'

type ContextMenuT = {
  onContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  show: Display
  setShow: (show: Display) => void
  setTargetPath: (path?: string) => void
}
const ContextMenu = React.createContext<ContextMenuT>({
  onContextMenu() {},
  show: DisplayEnum.none,
  setShow() {},
  setTargetPath() {},
})

export function ContextMenuProvider({ children }: { children: React.ReactNode }) {
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [show, setShow] = useState<Display>(DisplayEnum.none)
  const [targetPath, setTargetPath] = useState<undefined | string>(undefined)

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShow((prev: Display) => (prev === DisplayEnum.none ? DisplayEnum.block : DisplayEnum.none))
    if (show !== DisplayEnum.none) return null
    event.preventDefault()

    const { clientX, clientY } = event
    setTop(clientY)
    setLeft(clientX)
  }

  const onClick = () => {
    setShow(() => DisplayEnum.none)
    setTargetPath(undefined)
  }

  useEffect(() => {
    if (show === DisplayEnum.none) {
      setTargetPath(undefined)
    }
  }, [show])

  const contextValue = { onContextMenu, show, setShow, targetPath, setTargetPath }
  return (
    <ContextMenu.Provider value={contextValue}>
      <ContextMenuComponent
        targetPath={targetPath}
        setShow={setShow}
        top={top}
        left={left}
        display={show}
      />
      <div onContextMenu={(event) => onContextMenu(event)} onClick={() => onClick()}>
        {children}
      </div>
    </ContextMenu.Provider>
  )
}

export default ContextMenu
