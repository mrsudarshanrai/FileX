import { IContextMenuItem, IContextMenuItemEnum } from './contextmenu.types'

const contextMenuItems: IContextMenuItem[] = [
  {
    label: 'New Folder',
    name: IContextMenuItemEnum.newFolder,
    shortcut: 'Shift + Ctrl + N',
  },
  {
    label: 'Copy',
    name: IContextMenuItemEnum.copy,
    shortcut: 'Ctrl + C',
    disabled: true,
  },
  {
    label: 'Paste',
    name: IContextMenuItemEnum.paste,
    shortcut: 'Ctrl + P',
  },
  {
    label: 'Select All',
    name: IContextMenuItemEnum.selectAll,
    shortcut: 'Ctrl + A',
  },
  {
    label: 'Properties',
    name: IContextMenuItemEnum.properties,
    shortcut: 'Ctrl + I',
  },
]

export { contextMenuItems }
