import { IContextMenuItem, IContextMenuItemEnum } from './contextmenuModalType'

const contextMenuItems: IContextMenuItem[] = [
  {
    label: 'Open',
    name: IContextMenuItemEnum.open,
    shortcut: '',
  },
  {
    label: 'New Folder',
    name: IContextMenuItemEnum.newFolder,
    shortcut: '',
  },
  {
    label: 'Copy',
    name: IContextMenuItemEnum.copy,
    shortcut: '',
    disabled: true,
  },
  {
    label: 'Paste',
    name: IContextMenuItemEnum.paste,
    shortcut: '',
  },
  {
    label: 'Delete',
    name: IContextMenuItemEnum.delete,
    shortcut: '',
  },
  {
    label: 'Select All',
    name: IContextMenuItemEnum.selectAll,
    shortcut: '',
  },
  {
    label: 'Properties',
    name: IContextMenuItemEnum.properties,
    shortcut: '',
  },
]

export { contextMenuItems }
