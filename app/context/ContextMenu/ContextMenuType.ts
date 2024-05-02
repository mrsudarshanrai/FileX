import { Display } from '@/app/components/ContextMenuModal/contextmenuModalType';

export type ContextMenuType = {
  onContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  show: Display;
  targetPath: string | undefined;
  setShow: (show: Display) => void;
  setTargetPath: (path?: string) => void;
  setIsTargetPathFile: (isFile: boolean) => void;
  isTargetPathFile: boolean;
  fileRenamePath: string | null;
  setFileRenamePath: (path: string | null) => void;
};
