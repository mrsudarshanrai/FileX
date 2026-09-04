import { ContextMenuType } from '@/app/context/ContextMenu/ContextMenuType';

export type ContextMenuModalProps = Pick<
  ContextMenuType,
  'targetPath' | 'setShow' | 'isTargetPathFile' | 'setFileRenamePath'
> & {
  top: number;
  left: number;
  display: Display;
  setSorucePathToCopy: React.Dispatch<React.SetStateAction<string[]>>;
  sorucePathToCopy: string[];
  setIsCut: React.Dispatch<React.SetStateAction<boolean>>;
  isCut: boolean;
};
export enum DisplayEnum {
  none = 'none',
  block = 'block',
}
export type Display = keyof typeof DisplayEnum;

export type IContextMenuItem = {
  label: string;
  name: ContextMenuItemUnion;
  shortcut: string;
  disabled?: boolean;
};

export type ContextMenuItemElement = {
  disabled: boolean | undefined;
};

export type ContextMenuWrapperProps = ContextMenuModalProps & {
  itemCount: number;
};

export enum IContextMenuItemEnum {
  open = 'open',
  newFolder = 'newFolder',
  rename = 'rename',
  copy = 'copy',
  cut = 'cut',
  name = 'name',
  paste = 'paste',
  selectAll = 'selectAll',
  properties = 'properties',
  moveToTrash = 'moveToTrash',
  deletePermanently = 'deletePermanently',
  restore = 'restore',
  deleteFromTrash = 'deleteFromTrash',
  emptyTrash = 'emptyTrash',
}

export type ContextMenuItemUnion = keyof typeof IContextMenuItemEnum;
