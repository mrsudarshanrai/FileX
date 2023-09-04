export type ContextMenuModalProps = {
  top: number
  left: number
  display: Display
}

export type Display = 'none' | 'block'

export type IContextMenuItem = {
  label: string
  name: string
  shortcut: string
  disabled?: boolean
}

export type ContextMenuItemElement = {
  disabled: boolean | undefined
}

export type ContextMenuWrapperProps = ContextMenuModalProps & {
  itemCount: number
}
