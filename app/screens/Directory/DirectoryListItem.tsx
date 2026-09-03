import { memo } from 'react';
import { FileListName, FileListRow, FileRenameInput } from './DirectoryStyled';
import FileIcon from '@/app/components/FileIcon';

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

const DirectoryListItem = memo((props: Props) => {
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
    <FileListRow
      data-path={path}
      onContextMenu={(event) => onContextMenu(event, path, isFolder)}
      onClick={(event) => onFileClick(path, folderName, isFolder, event)}
      onDoubleClick={() => onFileDoubleClick(path, isFolder)}
    >
      <div className='file_icon_container'>
        <FileIcon thumbnail={thumbnail} path={path} isImage={isImage} size={30} />
      </div>
      {isRenaming ? (
        <FileRenameInput
          value={fileName}
          autoFocus={true}
          onKeyDown={onKeyDown}
          onChange={(event) => onFileNameChange(event.target.value)}
        />
      ) : (
        <FileListName data-selected={isSelected} title={folderName}>
          {folderName}
        </FileListName>
      )}
    </FileListRow>
  );
});

DirectoryListItem.displayName = 'DirectoryListItem';

export default DirectoryListItem;
