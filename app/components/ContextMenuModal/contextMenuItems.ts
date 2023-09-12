import { IContextMenuItem, IContextMenuItemEnum } from './contextmenu.type'

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
    label: 'Delete',
    name: IContextMenuItemEnum.delete,
    shortcut: 'Ctrl + D',
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
