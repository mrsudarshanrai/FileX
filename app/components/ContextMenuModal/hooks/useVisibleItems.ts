import { useContext, useMemo } from 'react';
import { NavigationContext } from '@/app/context/NavigationContext';
import DirContext from '@/app/context/DirectoryContext';
import ContextMenu from '@/app/context/ContextMenu';
import { contextMenuItems } from '../contextMenuItems';
import { ContextMenuState, IContextMenuItem } from '../contextmenuModalType';

const stripTrailingSlash = (path: string) => path.replace(/\/+$/, '') || '/';

/**
 * Describes where the menu was opened and lets every item decide for itself
 * whether it belongs there, so a new item only has to declare its own rule.
 */
const useVisibleItems = (): IContextMenuItem[] => {
  const { currentPath } = useContext(NavigationContext);
  const { trashPath, bookmarks } = useContext(DirContext);
  const { targetPath, isTargetPathFile } = useContext(ContextMenu);

  const isInTrash =
    Boolean(trashPath) && (currentPath === trashPath || currentPath.startsWith(`${trashPath}/`));

  const bookmarkTarget = targetPath ?? currentPath;

  return useMemo(() => {
    const state: ContextMenuState = {
      hasTarget: targetPath !== undefined,
      isTargetFile: isTargetPathFile,
      isInTrash,
      isTargetBookmarked: bookmarks.some(
        (bookmark) => stripTrailingSlash(bookmark.path) === stripTrailingSlash(bookmarkTarget),
      ),
    };

    return contextMenuItems.filter((item) => item.isVisible?.(state) ?? true);
  }, [targetPath, isTargetPathFile, isInTrash, bookmarks, bookmarkTarget]);
};

export { useVisibleItems };
