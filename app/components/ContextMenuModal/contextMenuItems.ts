import { IContextMenuItem, IContextMenuItemEnum } from './contextmenuModalType';

const contextMenuItems: IContextMenuItem[] = [
  {
    label: 'Open',
    name: IContextMenuItemEnum.open,
    shortcut: '',
    isVisible: ({ hasTarget }) => hasTarget,
  },
  {
    label: 'New Folder',
    name: IContextMenuItemEnum.newFolder,
    shortcut: '',
    isVisible: ({ hasTarget, isInTrash }) => !hasTarget && !isInTrash,
  },
  {
    label: 'Copy',
    name: IContextMenuItemEnum.copy,
    shortcut: '',
    isVisible: ({ hasTarget }) => hasTarget,
  },
  {
    label: 'Cut',
    name: IContextMenuItemEnum.cut,
    shortcut: '',
    isVisible: ({ hasTarget, isInTrash }) => hasTarget && !isInTrash,
  },
  {
    label: 'Paste',
    name: IContextMenuItemEnum.paste,
    shortcut: '',
    isVisible: ({ isInTrash }) => !isInTrash,
  },
  {
    label: 'Rename',
    name: IContextMenuItemEnum.rename,
    shortcut: '',
    isVisible: ({ hasTarget, isInTrash }) => hasTarget && !isInTrash,
  },
  {
    label: 'Move to Trash',
    name: IContextMenuItemEnum.moveToTrash,
    shortcut: '',
    isVisible: ({ hasTarget, isInTrash }) => hasTarget && !isInTrash,
  },
  {
    label: 'Delete permanently',
    name: IContextMenuItemEnum.deletePermanently,
    shortcut: '',
    isVisible: ({ hasTarget, isInTrash }) => hasTarget && !isInTrash,
  },
  {
    label: 'Add to Bookmarks',
    name: IContextMenuItemEnum.addBookmark,
    shortcut: '',
    isVisible: ({ hasTarget, isTargetFile, isInTrash, isTargetBookmarked }) =>
      !isInTrash && !isTargetBookmarked && (!hasTarget || !isTargetFile),
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
    isVisible: ({ hasTarget, isInTrash }) => hasTarget && isInTrash,
  },
  {
    label: 'Delete Permanently',
    name: IContextMenuItemEnum.deleteFromTrash,
    shortcut: '',
    isVisible: ({ hasTarget, isInTrash }) => hasTarget && isInTrash,
  },
  {
    label: 'Empty Trash',
    name: IContextMenuItemEnum.emptyTrash,
    shortcut: '',
    isVisible: ({ isInTrash }) => isInTrash,
  },
];

export { contextMenuItems };
