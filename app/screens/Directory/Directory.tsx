import { useContext } from 'react';
import DirContext from '@/app/context/DirectoryContext';
import { NavigationContext } from '@/app/context/NavigationContext';
import { IDir } from '@/app/lib/types/dir';
import {
  DirContainer,
  DirContainerWrapper,
  File,
  FileGrid,
  FileName,
  FileNameWrapper,
  FileRenameInput,
  LoadingOverlay,
} from './DirectoryStyled';
import FileIcon from '@/app/components/FileIcon';
import { checkIfRenameEnabled } from './directoryUtils';
import { useDirectoryLogics } from './hooks/useDirectoryLogics';

const Directory = () => {
  const { dirs, isLoading } = useContext(DirContext);
  const { currentPath } = useContext(NavigationContext);
  const {
    onContextMenu,
    onFileClick,
    onFileDoubleClick,
    onDirectoryContainerClicked,
    onKeyDown,
    fileRenamePath,
    setFileName,
    fileName,
    activePath,
  } = useDirectoryLogics();

  const hasDirs = dirs && dirs.length > 0;
  return (
    <DirContainerWrapper onClick={onDirectoryContainerClicked}>
      {isLoading && <LoadingOverlay>Fetching files…</LoadingOverlay>}
      {hasDirs && (
        <DirContainer key={currentPath}>
          {dirs.map(({ folder_name, path, is_dir: isFolder, is_visible, extension }: IDir.IDir) => {
            if (!is_visible) return null;
            return (
              <FileGrid key={path} draggable={true}>
                <File
                  onContextMenu={(event) => {
                    onContextMenu(event, path, isFolder);
                  }}
                  onClick={() => onFileClick(path, folder_name, isFolder)}
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
                      <FileName isSelected={activePath === path}>{folder_name}</FileName>
                    )}
                  </FileNameWrapper>
                </File>
              </FileGrid>
            );
          })}
        </DirContainer>
      )}
    </DirContainerWrapper>
  );
};

export default Directory;
