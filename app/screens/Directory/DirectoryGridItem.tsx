import { memo } from 'react';
import { File, FileGrid, FileName, FileNameWrapper, FileRenameInput } from './DirectoryStyled';
import FileIcon from '@/app/components/FileIcon';
import { truncateMiddle } from '@/app/utils';

const FILE_NAME_MAX_LENGTH = 26;

type Props = {
  path: string;
  folderName: string;
  isFolder: boolean;
  thumbnail: string;
  isImage: boolean;
  isSelected: boolean;
  isRenaming: boolean;
  fileName: string;
  onFileNameChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onContextMenu: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    path: string,
    isFolder: boolean,
  ) => void;
  onFileClick: (
    path: string,
    folderName: string,
    isFolder: boolean,
    event: React.MouseEvent,
  ) => void;
  onFileDoubleClick: (path: string, isFolder: boolean) => void;
};

const DirectoryGridItem = memo((props: Props) => {
  const {
    path,
    folderName,
    isFolder,
    thumbnail,
    isImage,
    isSelected,
    isRenaming,
    fileName,
    onFileNameChange,
    onKeyDown,
    onContextMenu,
    onFileClick,
    onFileDoubleClick,
  } = props;

  return (
    <FileGrid data-path={path} draggable={true}>
      <File
        onContextMenu={(event) => onContextMenu(event, path, isFolder)}
        onClick={(event) => onFileClick(path, folderName, isFolder, event)}
        onDoubleClick={() => onFileDoubleClick(path, isFolder)}
      >
        <div className='file_icon_container'>
          <FileIcon thumbnail={thumbnail} path={path} isImage={isImage} />
        </div>
        <FileNameWrapper title={folderName}>
          {isRenaming ? (
            <FileRenameInput
              value={fileName}
              autoFocus={true}
              onKeyDown={onKeyDown}
              onChange={(event) => onFileNameChange(event.target.value)}
            />
          ) : (
            <FileName data-selected={isSelected}>
              {truncateMiddle(folderName, FILE_NAME_MAX_LENGTH)}
            </FileName>
          )}
        </FileNameWrapper>
      </File>
    </FileGrid>
  );
});

DirectoryGridItem.displayName = 'DirectoryGridItem';

export default DirectoryGridItem;
