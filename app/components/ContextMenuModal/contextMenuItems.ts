import { IContextMenuItem, IContextMenuItemEnum } from './contextmenuModalType';

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
    label: 'Cut',
    name: IContextMenuItemEnum.cut,
    shortcut: '',
    disabled: true,
  },
  {
    label: 'Paste',
    name: IContextMenuItemEnum.paste,
    shortcut: '',
  },
  {
    label: 'Rename',
    name: IContextMenuItemEnum.rename,
    shortcut: '',
  },
  {
    label: 'Move to Trash',
    name: IContextMenuItemEnum.moveToTrash,
    shortcut: '',
  },
  {
    label: 'Delete permanently',
    name: IContextMenuItemEnum.deletePermanently,
    shortcut: '',
  },
  {
    label: 'Properties',
    name: IContextMenuItemEnum.properties,
    shortcut: '',
  },
  {
    label: 'Select All',
    name: IContextMenuItemEnum.selectAll,
    shortcut: '',
  },
  {
    label: 'Restore',
    name: IContextMenuItemEnum.restore,
    shortcut: '',
  },
  {
    label: 'Delete Permanently',
    name: IContextMenuItemEnum.deleteFromTrash,
    shortcut: '',
  },
  {
    label: 'Empty Trash',
    name: IContextMenuItemEnum.emptyTrash,
    shortcut: '',
  },
];

export { contextMenuItems };
