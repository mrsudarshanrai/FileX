import React, { useState } from 'react'
import ContextMenuComponent, { Display } from '@/app/components/ContextMenu'

const ContextMenu = React.createContext<undefined>(undefined)

export function ContextMenuProvider({ children }: { children: React.ReactNode }) {
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [display, setDisplay] = useState<Display>('none')

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDisplay(() => 'none')
    event.preventDefault()

    const { clientX, clientY } = event

    setTop(clientY)
    setLeft(clientX)
    setDisplay(() => 'block')
  }

  return (
    <ContextMenu.Provider value={undefined}>
      <ContextMenuComponent top={top} left={left} display={display} />
      <div onContextMenu={(event) => onContextMenu(event)}>{children}</div>
    </ContextMenu.Provider>
  )
}

export default ContextMenu
