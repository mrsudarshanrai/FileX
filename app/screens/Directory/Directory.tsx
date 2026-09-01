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
  ListContainer,
  FileListRow,
  FileListName,
} from './DirectoryStyled';
import FileIcon from '@/app/components/FileIcon';
import { checkIfRenameEnabled } from './directoryUtils';
import { useDirectoryLogics } from './hooks/useDirectoryLogics';
import { truncateMiddle } from '@/app/utils';

const FILE_NAME_MAX_LENGTH = 26;

const Directory = () => {
  const { dirs, isLoading, viewMode } = useContext(DirContext);
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

  if (hasDirs && viewMode === 'list') {
    return (
      <DirContainerWrapper onClick={onDirectoryContainerClicked}>
        {isLoading && <LoadingOverlay>Fetching files…</LoadingOverlay>}
        <ListContainer key={currentPath}>
          {dirs.map(
            ({
              folder_name,
              path,
              is_dir: isFolder,
              is_visible,
              thumbnail,
              is_image,
            }: IDir.IDir) => {
              if (!is_visible) return null;
              return (
                <FileListRow
                  key={path}
                  onContextMenu={(event) => {
                    onContextMenu(event, path, isFolder);
                  }}
                  onClick={() => onFileClick(path, folder_name, isFolder)}
                  onDoubleClick={() => onFileDoubleClick(path, isFolder)}
                >
                  <div className='file_icon_container'>
                    <FileIcon thumbnail={thumbnail} path={path} isImage={is_image} size={20} />
                  </div>
                  {checkIfRenameEnabled(fileRenamePath, path) ? (
                    <FileRenameInput
                      value={fileName}
                      autoFocus={true}
                      onKeyDown={onKeyDown}
                      onChange={(event) => setFileName(event?.target.value)}
                    />
                  ) : (
                    <FileListName isSelected={activePath === path} title={folder_name}>
                      {folder_name}
                    </FileListName>
                  )}
                </FileListRow>
              );
            },
          )}
        </ListContainer>
      </DirContainerWrapper>
    );
  }

  return (
    <DirContainerWrapper onClick={onDirectoryContainerClicked}>
      {isLoading && <LoadingOverlay>Fetching files…</LoadingOverlay>}
      {hasDirs && (
        <DirContainer key={currentPath}>
          {dirs.map(
            ({
              folder_name,
              path,
              is_dir: isFolder,
              is_visible,
              thumbnail,
              is_image,
            }: IDir.IDir) => {
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
                      <FileIcon thumbnail={thumbnail} path={path} isImage={is_image} />
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
                        <FileName isSelected={activePath === path}>
                          {truncateMiddle(folder_name, FILE_NAME_MAX_LENGTH)}
                        </FileName>
                      )}
                    </FileNameWrapper>
                  </File>
                </FileGrid>
              );
            },
          )}
        </DirContainer>
      )}
    </DirContainerWrapper>
  );
};

export default Directory;
