import { useContext } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { NavigationContext } from '@/app/context/NavigationContext';
import DirContext from '@/app/context/DirectoryContext';
import ContextMenu from '@/app/context/ContextMenu';
import DirectorySizeContext from '@/app/context/DirectorySizeContext/DirectorySizeContext';
import { useOperations } from '@/app/context/OperationContext';
import { useContextMenu } from '@/app/hooks/useContextMenu';
import { ContextMenuItemUnion, DisplayEnum } from '../contextmenuModalType';

type CreateFolderResponse = {
  folder_path: string;
  success: string;
};

type MenuAction = () => void | Promise<void>;

/** "Moving 3 items…" or "Copying item…" */
const pasteLabel = (isCut: boolean, count: number) => {
  const verb = isCut ? 'Moving' : 'Copying';
  return count > 1 ? `${verb} ${count} items…` : `${verb} item…`;
};

/**
 * What every item does when picked. The map is keyed by the item union, so an
 * item added to contextMenuItems does not compile until it has an action here.
 */
const useMenuActions = (): Record<ContextMenuItemUnion, MenuAction> => {
  const { currentPath, navigate } = useContext(NavigationContext);
  const { fetch, dirs, selectedPaths, setSelectedPaths } = useContext(DirContext);
  const { setIsFetchingFunc } = useContext(DirectorySizeContext);
  const { startOperation, finishOperation } = useOperations();
  const {
    setShow,
    targetPath,
    isTargetPathFile,
    setFileRenamePath,
    sourcePathsToCopy,
    setSourcePathsToCopy,
    isCut,
    setIsCut,
  } = useContext(ContextMenu);
  const {
    addBookmark,
    deleteFile,
    deletePermanently,
    restoreFromTrash,
    deleteFromTrash,
    emptyTrash,
    showFileProperties,
    openFile,
  } = useContextMenu();

  const close = () => setShow(DisplayEnum.none);

  return {
    open: () => {
      close();
      if (!targetPath) return;
      if (isTargetPathFile) openFile(targetPath);
      else navigate(targetPath);
    },

    newFolder: async () => {
      await invoke('create_folder', { folderPath: currentPath })
        .then((response) => {
          if (typeof response === 'object' && (response as CreateFolderResponse)?.success) {
            setFileRenamePath((response as CreateFolderResponse)?.folder_path);
          }
          fetch(currentPath, 'get_files_in_path');
          close();
        })
        .catch(console.error);
    },

    copy: () => {
      setSourcePathsToCopy(Array.from(selectedPaths));
      setIsCut(false);
      close();
    },

    cut: () => {
      setSourcePathsToCopy(Array.from(selectedPaths));
      setIsCut(true);
      close();
    },

    paste: async () => {
      close();
      const opId = startOperation({ label: pasteLabel(isCut, sourcePathsToCopy.length) });

      try {
        setSelectedPaths(new Set());
        await Promise.all(
          sourcePathsToCopy.map((from) =>
            invoke(isCut ? 'move_to_path' : 'copy_to_path', {
              from,
              to: currentPath,
              operationId: opId,
            }),
          ),
        );
        if (isCut) {
          setSourcePathsToCopy([]);
          setIsCut(false);
        }
      } catch (error) {
        console.error(error);
        finishOperation(opId, 'failed', String(error));
      }
    },

    rename: () => {
      if (!targetPath) return;
      setFileRenamePath(targetPath);
      close();
    },

    selectAll: () => {
      setSelectedPaths(new Set(dirs.filter((dir) => dir.is_visible).map((dir) => dir.path)));
      close();
    },

    properties: async () => {
      const path = targetPath || currentPath;
      if (!path) return;

      setIsFetchingFunc(true);
      close();
      showFileProperties(path);
      await invoke('calculate_directory_size', { dirPath: path });
    },

    addBookmark: () => addBookmark(targetPath ?? currentPath),
    moveToTrash: deleteFile,
    deletePermanently: () => deletePermanently(),
    restore: restoreFromTrash,
    deleteFromTrash,
    emptyTrash,
  };
};

export { useMenuActions };
