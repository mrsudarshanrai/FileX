import { useContext, useEffect } from 'react';
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
  SelectionBox,
} from './DirectoryStyled';
import FileIcon from '@/app/components/FileIcon';
import { checkIfRenameEnabled } from './directoryUtils';
import { useDirectoryLogics } from './hooks/useDirectoryLogics';
import { truncateMiddle } from '@/app/utils';

const FILE_NAME_MAX_LENGTH = 26;

const Directory = () => {
  const { dirs, isLoading, viewMode, selectedPaths, setSelectedPaths } = useContext(DirContext);
  const { currentPath } = useContext(NavigationContext);
  const {
    onContextMenu,
    onFileClick,
    onFileDoubleClick,
    onDirectoryContainerClicked,
    onContainerMouseDown,
    containerRef,
    selectionBox,
    onKeyDown,
    fileRenamePath,
    setFileName,
    fileName,
  } = useDirectoryLogics();

  const hasDirs = dirs && dirs.length > 0;

  useEffect(() => {
    setSelectedPaths(new Set());
  }, [currentPath, setSelectedPaths]);

  if (hasDirs && viewMode === 'list') {
    return (
      <DirContainerWrapper
        ref={containerRef}
        onClick={onDirectoryContainerClicked}
        onMouseDown={onContainerMouseDown}
      >
        {isLoading && <LoadingOverlay>Fetching files…</LoadingOverlay>}
        {selectionBox && <SelectionBox style={selectionBox} />}
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
                  data-path={path}
                  onContextMenu={(event) => {
                    onContextMenu(event, path, isFolder);
                  }}
                  onClick={(event) => onFileClick(path, folder_name, isFolder, event)}
                  onDoubleClick={() => onFileDoubleClick(path, isFolder)}
                >
                  <div className='file_icon_container'>
                    <FileIcon thumbnail={thumbnail} path={path} isImage={is_image} size={30} />
                  </div>
                  {checkIfRenameEnabled(fileRenamePath, path) ? (
                    <FileRenameInput
                      value={fileName}
                      autoFocus={true}
                      onKeyDown={onKeyDown}
                      onChange={(event) => setFileName(event?.target.value)}
                    />
                  ) : (
                    <FileListName isSelected={selectedPaths.has(path)} title={folder_name}>
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
    <DirContainerWrapper
      ref={containerRef}
      onClick={onDirectoryContainerClicked}
      onMouseDown={onContainerMouseDown}
    >
      {isLoading && <LoadingOverlay>Fetching files…</LoadingOverlay>}
      {selectionBox && <SelectionBox style={selectionBox} />}
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
                <FileGrid key={path} data-path={path} draggable={true}>
                  <File
                    onContextMenu={(event) => {
                      onContextMenu(event, path, isFolder);
                    }}
                    onClick={(event) => onFileClick(path, folder_name, isFolder, event)}
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
                        <FileName isSelected={selectedPaths.has(path)}>
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
