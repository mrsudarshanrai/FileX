import { useContext, useEffect, useState } from 'react';
import ContextMenu from '../context/ContextMenu';
import { getFileNameFromPath } from '../utils';
import { invoke } from '@tauri-apps/api/tauri';
import { NavigationContext } from '../context/NavigationContext';
import DirContext from '../context/DirectoryContext';

const useRenameFile = () => {
  const { fetch } = useContext(DirContext);
  const { currentPath } = useContext(NavigationContext);
  const { fileRenamePath, setFileRenamePath } = useContext(ContextMenu);

  const [fileName, setFileName] = useState('');

  const renameFile = async (newName: string) => {
    if (!fileRenamePath || newName.length === 0) return;
    await invoke('rename', {
      path: fileRenamePath,
      newName,
    }).then(() => {
      setFileRenamePath(null);
      fetch(currentPath, 'get_files_in_path');
    });
  };

  useEffect(() => {
    if (fileRenamePath) {
      setFileName(getFileNameFromPath(fileRenamePath) as string);
    }
  }, [fileRenamePath]);

  return { fileName, setFileName, renameFile, fileRenamePath, setFileRenamePath };
};

export { useRenameFile };
