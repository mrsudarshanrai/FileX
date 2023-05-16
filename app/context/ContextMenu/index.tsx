import React, { useState } from 'react'
import ContextMenuComponent, { Display } from '@/app/components/ContextMenu'

type ContextMenuT = {
  onContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  show: Display
  setShow: (show: Display) => void
}
const ContextMenu = React.createContext<ContextMenuT>({
  onContextMenu() {},
  show: 'none',
  setShow() {},
})

export function ContextMenuProvider({ children }: { children: React.ReactNode }) {
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [show, setShow] = useState<Display>('none')

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShow((prev) => (prev === 'none' ? 'block' : 'none'))
    if (show !== 'none') return null
    event.preventDefault()

    const { clientX, clientY } = event

    setTop(clientY)
    setLeft(clientX)
  }

  const onClick = () => {
    setShow(() => 'none')
  }

  const contextValue = { onContextMenu, show, setShow }
  return (
    <ContextMenu.Provider value={contextValue}>
      <ContextMenuComponent top={top} left={left} display={show} />
      <div onContextMenu={(event) => onContextMenu(event)} onClick={() => onClick()}>
        {children}
      </div>
    </ContextMenu.Provider>
  )
}

export default ContextMenu
