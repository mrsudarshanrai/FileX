import { ContextMenuItem, ContextMenuWrapper } from './ContextMenuStyled'

export type Display = 'none' | 'block'
export type ContextMenuModal = {
  top: number
  left: number
  display: Display
}

export type ContextMenuItem = {
  label: string
  icon: string
  shortcut: string
}
const contextMenuItems: ContextMenuItem[] = [
  {
    label: 'New Folder',
    icon: '',
    shortcut: '',
  },
  {
    label: 'Paste',
    icon: '',
    shortcut: '',
  },
  {
    label: 'Select All',
    icon: '',
    shortcut: '',
  },
  {
    label: 'Properties',
    icon: '',
    shortcut: '',
  },
]

const ContextMenuModal = (props: ContextMenuModal) => {
  const { top, left, display } = props
  return (
    <ContextMenuWrapper
      onContextMenu={(e) => e.preventDefault()}
      top={top}
      left={left}
      display={display}
    >
      {contextMenuItems.map((contextMenu: ContextMenuItem, index: number) => (
        <ContextMenuItem key={index}>{contextMenu.label}</ContextMenuItem>
      ))}
    </ContextMenuWrapper>
  )
}

export default ContextMenuModal
