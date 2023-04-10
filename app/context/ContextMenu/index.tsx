import React from 'react'

const ContextMenu = React.createContext({})

export function ContextMenuProvider({ children }: { children: React.ReactNode }) {
  return <ContextMenu.Provider value={'sddd'}>{children}</ContextMenu.Provider>
}

export default ContextMenu
