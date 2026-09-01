import { Display, DisplayEnum } from '@/app/components/ContextMenuModal/contextmenuModalType';
import ContextMenu from '@/app/context/ContextMenu';
import DirContext from '@/app/context/DirectoryContext';
import { NavigationContext } from '@/app/context/NavigationContext';
import { useContextMenu } from '@/app/hooks/useContextMenu';
import { useRenameFile } from '@/app/hooks/useRenameFile';
import { useContext, useMemo, useRef, useState } from 'react';

const DRAG_THRESHOLD = 4;

type SelectionBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const boxesIntersect = (rect: DOMRect, box: SelectionBox) =>
  rect.left < box.left + box.width &&
  rect.right > box.left &&
  rect.top < box.top + box.height &&
  rect.bottom > box.top;

const useDirectoryLogics = () => {
  const { navigate } = useContext(NavigationContext);
  const { show, setShow, setTargetPath, setIsTargetPathFile } = useContext(ContextMenu);

  const { openFile } = useContextMenu();
  const { dirs, selectedPaths, setSelectedPaths } = useContext(DirContext);
  const { fileName, setFileName, renameFile, fileRenamePath, setFileRenamePath } = useRenameFile();
  const isContextMenuOpen = (value: Display) => value === DisplayEnum.none;

  const anchorPathRef = useRef<string | null>(null);
  const didDragRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);

  const visiblePaths = useMemo(
    () => dirs.filter((dir) => dir.is_visible).map((dir) => dir.path),
    [dirs],
  );

  const onFileDoubleClick = async (path: string, isFolder: boolean) => {
    setTargetPath(path);
    setShow(DisplayEnum.none);
    if (isFolder) {
      if (isContextMenuOpen(show)) navigate(path);
    } else {
      openFile(path);
    }
  };

  const onFileClick = (
    filePath: string,
    folder_name: string,
    isFolder: boolean,
    event: React.MouseEvent,
  ) => {
    setShow(DisplayEnum.none);
    if (!isContextMenuOpen(show)) return;

    if (event.shiftKey && anchorPathRef.current) {
      const anchorIndex = visiblePaths.indexOf(anchorPathRef.current);
      const targetIndex = visiblePaths.indexOf(filePath);
      if (anchorIndex !== -1 && targetIndex !== -1) {
        const [start, end] =
          anchorIndex < targetIndex ? [anchorIndex, targetIndex] : [targetIndex, anchorIndex];
        setSelectedPaths(new Set(visiblePaths.slice(start, end + 1)));
        return;
      }
    }

    if (event.ctrlKey || event.metaKey) {
      setSelectedPaths((prev) => {
        const next = new Set(prev);
        if (next.has(filePath)) next.delete(filePath);
        else next.add(filePath);
        return next;
      });
      anchorPathRef.current = filePath;
      return;
    }

    anchorPathRef.current = filePath;
    setSelectedPaths(new Set([filePath]));
  };

  const onContextMenu = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    path: string,
    isFolder: boolean,
  ) => {
    event?.preventDefault();
    if (isContextMenuOpen(show)) {
      setSelectedPaths((prev) => (prev.has(path) ? prev : new Set([path])));
      anchorPathRef.current = path;
    }
    setTargetPath(path);
    setIsTargetPathFile(!isFolder);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      renameFile(fileName);
    }
  };

  const onDirectoryContainerClicked = (event: React.MouseEvent<HTMLDivElement>) => {
    setShow(DisplayEnum.none);
    setTargetPath(undefined);
    setFileRenamePath(null);
    renameFile(fileName);

    const target = event.target as HTMLElement;
    const clickedItem = target.closest('[data-path]');
    if (!clickedItem && !didDragRef.current) {
      setSelectedPaths(new Set());
    }
  };

  const onContainerMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest('[data-path]')) return;

    didDragRef.current = false;
    const startX = event.clientX;
    const startY = event.clientY;
    const additive = event.ctrlKey || event.metaKey || event.shiftKey;
    const baseSelection = additive ? new Set(selectedPaths) : new Set<string>();

    const onMouseMove = (moveEvent: MouseEvent) => {
      const box: SelectionBox = {
        left: Math.min(startX, moveEvent.clientX),
        top: Math.min(startY, moveEvent.clientY),
        width: Math.abs(moveEvent.clientX - startX),
        height: Math.abs(moveEvent.clientY - startY),
      };

      if (!didDragRef.current && (box.width > DRAG_THRESHOLD || box.height > DRAG_THRESHOLD)) {
        didDragRef.current = true;
      }
      if (!didDragRef.current) return;

      setSelectionBox(box);

      const items = containerRef.current?.querySelectorAll<HTMLElement>('[data-path]');
      const next = new Set(baseSelection);
      items?.forEach((el) => {
        const path = el.dataset.path;
        if (path && boxesIntersect(el.getBoundingClientRect(), box)) {
          next.add(path);
        }
      });
      setSelectedPaths(next);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      setSelectionBox(null);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return {
    onFileDoubleClick,
    onFileClick,
    onContextMenu,
    onKeyDown,
    onDirectoryContainerClicked,
    onContainerMouseDown,
    containerRef,
    selectionBox,
    setFileName,
    fileRenamePath,
    fileName,
  };
};

export { useDirectoryLogics };
