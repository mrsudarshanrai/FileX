/** Everything else the menu needs it reads from ContextMenu itself */
export type ContextMenuModalProps = {
  top: number;
  left: number;
};
export enum DisplayEnum {
  none = 'none',
  block = 'block',
}
export type Display = keyof typeof DisplayEnum;

export type ContextMenuState = {
  hasTarget: boolean;
  isTargetFile: boolean;
  isInTrash: boolean;
  isTargetBookmarked: boolean;
};

export type IContextMenuItem = {
  label: string;
  name: ContextMenuItemUnion;
  shortcut: string;
  /** omitted means always shown */
  isVisible?: (state: ContextMenuState) => boolean;
};

export type ContextMenuItemElement = {
  disabled: boolean | undefined;
};

export enum IContextMenuItemEnum {
  open = 'open',
  newFolder = 'newFolder',
  rename = 'rename',
  copy = 'copy',
  cut = 'cut',
  paste = 'paste',
  selectAll = 'selectAll',
  addBookmark = 'addBookmark',
  properties = 'properties',
  moveToTrash = 'moveToTrash',
  deletePermanently = 'deletePermanently',
  restore = 'restore',
  deleteFromTrash = 'deleteFromTrash',
  emptyTrash = 'emptyTrash',
}

export type ContextMenuItemUnion = keyof typeof IContextMenuItemEnum;
