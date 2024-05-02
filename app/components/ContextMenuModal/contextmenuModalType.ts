import { ContextMenuType } from '@/app/context/ContextMenu/ContextMenuType';

export type ContextMenuModalProps = Pick<
  ContextMenuType,
  'targetPath' | 'setShow' | 'isTargetPathFile' | 'setFileRenamePath'
> & {
  top: number;
  left: number;
  display: Display;
  setSorucePathToCopy: React.Dispatch<React.SetStateAction<string | undefined>>;
  sorucePathToCopy: string | undefined;
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
  name = 'name',
  paste = 'paste',
  selectAll = 'selectAll',
  properties = 'properties',
  delete = 'delete',
}

export type ContextMenuItemUnion = keyof typeof IContextMenuItemEnum;
