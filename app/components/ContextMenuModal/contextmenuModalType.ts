import { ContextMenuType } from '@/app/context/ContextMenu/ContextMenuType';

export type ContextMenuModalProps = Pick<
  ContextMenuType,
  'targetPath' | 'setShow' | 'isTargetPathFile' | 'setFileRenamePath'
> & {
  top: number;
  left: number;
  setSourcePathsToCopy: React.Dispatch<React.SetStateAction<string[]>>;
  sourcePathsToCopy: string[];
  setIsCut: React.Dispatch<React.SetStateAction<boolean>>;
  isCut: boolean;
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
