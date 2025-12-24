import { Display, DisplayEnum } from '@/app/components/ContextMenuModal/contextmenuModalType';
import ContextMenu from '@/app/context/ContextMenu';
import { NavigationContext } from '@/app/context/NavigationContext';
import { useContextMenu } from '@/app/hooks/useContextMenu';
import { useDir } from '@/app/hooks/useDir';
import { useRenameFile } from '@/app/hooks/useRenameFile';
import { useContext, useMemo } from 'react';

const useDirectoryLogics = () => {
  const { navigate } = useContext(NavigationContext);
  const { show, setShow, setTargetPath, setIsTargetPathFile } = useContext(ContextMenu);

  const { openFile } = useContextMenu();
  const { activeDir, setActiveDir } = useDir();
  const { fileName, setFileName, renameFile, fileRenamePath, setFileRenamePath } = useRenameFile();
  const isContextMenuOpen = (value: Display) => value === DisplayEnum.none;

  const onFileDoubleClick = async (path: string, isFolder: boolean) => {
    setTargetPath(path);
    setShow(DisplayEnum.none);
    if (isFolder) {
      if (isContextMenuOpen(show)) navigate(path);
    } else {
      openFile(path);
    }
  };

  const onFileClick = (filePath: string, folder_name: string, isFolder: boolean) => {
    setShow(DisplayEnum.none);
    if (isContextMenuOpen(show))
      setActiveDir({
        path: filePath,
        folder_name,
        is_dir: isFolder,
      });
  };

  const onContextMenu = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    path: string,
    isFolder: boolean,
  ) => {
    event?.preventDefault();
    if (isContextMenuOpen(show)) setActiveDir({ path });
    setTargetPath(path);
    setIsTargetPathFile(!isFolder);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      renameFile(fileName);
    }
  };

  const onDirectoryContainerClicked = () => {
    setShow(DisplayEnum.none);
    setTargetPath(undefined);
    setFileRenamePath(null);
    renameFile(fileName);
  };

  const activePath = useMemo(() => {
    return activeDir?.path;
  }, [activeDir]);

  return {
    onFileDoubleClick,
    onFileClick,
    onContextMenu,
    onKeyDown,
    onDirectoryContainerClicked,
    activePath,
    setFileName,
    fileRenamePath,
    fileName,
  };
};

export { useDirectoryLogics };
