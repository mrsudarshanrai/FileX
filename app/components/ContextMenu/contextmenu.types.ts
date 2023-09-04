export type ContextMenuModalProps = {
  top: number
  left: number
  display: Display
}

export type Display = 'none' | 'block'

export type IContextMenuItem = {
  label: string
  name: ContextMenuItemUnion
  shortcut: string
  disabled?: boolean
}

export type ContextMenuItemElement = {
  disabled: boolean | undefined
}

export type ContextMenuWrapperProps = ContextMenuModalProps & {
  itemCount: number
}

export enum IContextMenuItemEnum {
  newFolder = 'newFolder',
  copy = 'copy',
  name = 'name',
  paste = 'paste',
  selectAll = 'selectAll',
  properties = 'properties',
}

export type ContextMenuItemUnion = keyof typeof IContextMenuItemEnum
