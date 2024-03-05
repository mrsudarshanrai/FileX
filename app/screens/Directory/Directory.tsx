import React, { useContext, useState } from 'react';
import DirContext from '@/app/context/DirectoryContext';
import { IDir } from '@/app/lib/types/dir';
import {
  DirContainer,
  DirContainerWrapper,
  File,
  FileGrid,
  FileName,
  FileNameWrapper,
  FileRenameInput,
} from './DirectoryStyled';
import FileIcon from '@/app/components/FileIcon';
import { NavigationContext } from '@/app/context/NavigationContext';
import ContextMenu from '@/app/context/ContextMenu';
import { Display, DisplayEnum } from '@/app/components/ContextMenuModal/contextmenuModalType';
import { useContextMenu } from '@/app/hooks/useContextMenu';
import { checkIfRenameEnabled } from './directoryUtils';
import { useRenameFile } from '@/app/hooks/useRenameFile';

export const isContextMenuOpen = (value: Display) => value === DisplayEnum.none;

const Directory = () => {
  const { dirs, isLoading } = useContext(DirContext);
  const { navigate } = useContext(NavigationContext);
  const { show, setShow, setTargetPath, setIsTargetPathFile } = useContext(ContextMenu);

  const { openFile } = useContextMenu();
  const { fileName, setFileName, renameFile, fileRenamePath, setFileRenamePath } = useRenameFile();
  const [selectedFile, setSelectedFile] = useState<string>('');

  const onFileDoubleClick = async (path: string, isFolder: boolean) => {
    setTargetPath(path);
    setShow(DisplayEnum.none);
    if (isFolder) {
      if (isContextMenuOpen(show)) navigate(path);
    } else {
      openFile(path);
    }
  };

  const onFileClick = (filePath: string) => {
    setShow(DisplayEnum.none);
    if (isContextMenuOpen(show)) setSelectedFile(() => filePath);
  };

  const onContextMenu = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    path: string,
    isFolder: boolean,
  ) => {
    event?.preventDefault();
    if (isContextMenuOpen(show)) setSelectedFile(() => path);
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

  return (
    <DirContainerWrapper onClick={onDirectoryContainerClicked}>
      <DirContainer>
        {isLoading && <p>Fetching files</p>}
        {dirs.map(
          ({ folder_name, path, is_dir: isFolder, is_visible, extension }: IDir.IDirs, index) => {
            if (!is_visible) return null;
            return (
              <FileGrid key={path} draggable={true}>
                <File
                  onContextMenu={(event) => {
                    onContextMenu(event, path, isFolder);
                  }}
                  onClick={() => onFileClick(path)}
                  onDoubleClick={() => onFileDoubleClick(path, isFolder)}
                >
                  <div className='file_icon_container'>
                    <FileIcon isDir={isFolder} extension={extension} />
                  </div>
                  <FileNameWrapper title={folder_name}>
                    {checkIfRenameEnabled(fileRenamePath, path) ? (
                      <FileRenameInput
                        value={fileName}
                        autoFocus={true}
                        onKeyDown={onKeyDown}
                        onChange={(event) => setFileName(event?.target.value)}
                      />
                    ) : (
                      <FileName isSelected={selectedFile === path}>{folder_name}</FileName>
                    )}
                  </FileNameWrapper>
                </File>
              </FileGrid>
            );
          },
        )}
      </DirContainer>
    </DirContainerWrapper>
  );
};

export default Directory;
