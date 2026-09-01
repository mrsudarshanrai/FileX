import {
  ContextMenuItem,
  ContextMenuWrapper,
  ContentMenuItemShortcut,
  Item,
  IconContainer,
} from './contextMenuStyled';
import { useContext } from 'react';
import { NavigationContext } from '@/app/context/NavigationContext';
import { invoke } from '@tauri-apps/api/core';
import DirContext from '@/app/context/DirectoryContext';
import {
  ContextMenuModalProps,
  DisplayEnum,
  IContextMenuItem,
  IContextMenuItemEnum,
} from './contextmenuModalType';
import { contextMenuItems } from './contextMenuItems';
import { isOptionDisabled } from './utils';
import { useContextMenu } from '@/app/hooks/useContextMenu';
import DirectorySizeContext from '@/app/context/DirectorySizeContext/DirectorySizeContext';
import { Icon } from '../Icon/Icon';
import { IconType } from '../Icon/IconType';
import { useOperations } from '@/app/context/OperationContext';
import { useAppTheme } from '@/app/context/ThemeContext';
import { useTheme } from 'styled-components';
import { Color } from '@/app/theme/colorsType';

const CONDITIONAL_ITEM = ['delete', 'copy', 'cut', 'open', 'rename'];

const ContextMenuModal = (props: ContextMenuModalProps) => {
  const { currentPath, navigate } = useContext(NavigationContext);
  const { fetch, dirs, selectedPaths, setSelectedPaths } = useContext(DirContext);
  const { setIsFetchingFunc } = useContext(DirectorySizeContext);
  const { deleteFile, showFileProperties, openFile } = useContextMenu();
  const { mode } = useAppTheme();
  const theme = useTheme() as Color;

  const {
    top,
    left,
    display,
    setShow,
    targetPath,
    setSorucePathToCopy,
    sorucePathToCopy,
    setIsCut,
    isCut,
    isTargetPathFile,
    setFileRenamePath,
  } = props;

  type CreateFolderResponse = {
    folder_path: string;
    success: string;
  };
  const items = contextMenuItems.filter((item) => {
    if (CONDITIONAL_ITEM.includes(item.name) && typeof targetPath === 'undefined') {
      return false;
    }
    if (item.name === 'newFolder' && targetPath) {
      return false;
    }

    return true;
  });
  const { startOperation, finishOperation } = useOperations();

  const onContextItemClick = async (name: string) => {
    /** on new folder click */
    if (name === IContextMenuItemEnum.newFolder) {
      await invoke('create_folder', {
        folderPath: currentPath,
      })
        .then((response) => {
          if (typeof response === 'object' && (response as CreateFolderResponse)?.success) {
            setFileRenamePath((response as CreateFolderResponse)?.folder_path);
          }
          fetch(currentPath, 'get_files_in_path');
          setShow(DisplayEnum.none);
        })
        .catch(console.error);
    }

    /** on file/folder delete */
    if (name === IContextMenuItemEnum.delete) {
      deleteFile();
    }

    /**  on file/folder copy */
    if (name === IContextMenuItemEnum.copy) {
      setSorucePathToCopy(Array.from(selectedPaths));
      setIsCut(false);
      setShow(DisplayEnum.none);
    }

    /**  on file/folder cut */
    if (name === IContextMenuItemEnum.cut) {
      setSorucePathToCopy(Array.from(selectedPaths));
      setIsCut(true);
      setShow(DisplayEnum.none);
    }

    /**  on file/folder rename */
    if (name === IContextMenuItemEnum.rename) {
      if (targetPath) {
        setFileRenamePath(targetPath);
        setShow(DisplayEnum.none);
      }
    }

    /**  on properties view */
    if (name === IContextMenuItemEnum.properties) {
      if (targetPath || currentPath) {
        setIsFetchingFunc(true);
        setShow(DisplayEnum.none);
        showFileProperties(targetPath || currentPath);
        await invoke('calculate_directory_size', {
          dirPath: targetPath || currentPath,
        });
      }
    }

    /**  on select all */
    if (name === IContextMenuItemEnum.selectAll) {
      setSelectedPaths(new Set(dirs.filter((d) => d.is_visible).map((d) => d.path)));
      setShow(DisplayEnum.none);
    }

    if (name === IContextMenuItemEnum.open) {
      setShow(DisplayEnum.none);
      if (targetPath) {
        if (isTargetPathFile) openFile(targetPath);
        else navigate(targetPath);
      }
    }

    /**  on file/folder paste */
    if (name === IContextMenuItemEnum.paste) {
      setShow(DisplayEnum.none);

      const itemCount = sorucePathToCopy.length;
      const label = isCut
        ? itemCount > 1
          ? `Moving ${itemCount} items…`
          : 'Moving item…'
        : itemCount > 1
        ? `Copying ${itemCount} items…`
        : 'Copying item…';
      const opId = startOperation({ label });

      try {
        setSelectedPaths(new Set());
        await Promise.all(
          sorucePathToCopy.map((from) =>
            invoke(isCut ? 'move_to_path' : 'copy_to_path', {
              from,
              to: currentPath,
              operationId: opId,
            }),
          ),
        );
        if (isCut) {
          setSorucePathToCopy([]);
          setIsCut(false);
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
        finishOperation(opId, 'failed', String(error));
      } finally {
        setShow(DisplayEnum.none);
      }
    }
  };

  const iconFill = mode === 'dark' ? theme.text.onAccent : theme.text.secondary;

  return (
    <ContextMenuWrapper
      onContextMenu={(e) => e.preventDefault()}
      top={top}
      left={left}
      display={display}
      itemCount={items.length}
    >
      {items.map(({ name, label, shortcut }: IContextMenuItem, index: number) => {
        return (
          <ContextMenuItem
            key={index}
            disabled={isOptionDisabled(name, sorucePathToCopy)}
            onClick={() => !isOptionDisabled(name, sorucePathToCopy) && onContextItemClick(name)}
          >
            <Item>
              <IconContainer>
                <Icon name={name as IconType.IconName} fill={iconFill} />
              </IconContainer>
              {label}
            </Item>
            <ContentMenuItemShortcut>{shortcut}</ContentMenuItemShortcut>
          </ContextMenuItem>
        );
      })}
    </ContextMenuWrapper>
  );
};

export default ContextMenuModal;
