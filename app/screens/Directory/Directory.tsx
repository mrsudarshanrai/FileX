import { useContext, useEffect, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import DirContext from '@/app/context/DirectoryContext';
import { NavigationContext } from '@/app/context/NavigationContext';
import {
  DirContainerWrapper,
  LoadingOverlay,
  SelectionBox,
  GridScrollArea,
  ListScrollArea,
  VirtualContent,
  VirtualRow,
  GridRow,
  GRID_ROW_HEIGHT,
  LIST_ROW_HEIGHT,
  GRID_SCROLL_AREA_PADDING_X,
} from './DirectoryStyled';
import DirectoryGridItem from './DirectoryGridItem';
import DirectoryListItem from './DirectoryListItem';
import { checkIfRenameEnabled } from './directoryUtils';
import { useDirectoryLogics } from './hooks/useDirectoryLogics';
import { useGridColumns } from './hooks/useGridColumns';
import { useScrollMargin } from './hooks/useScrollMargin';

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

  const visibleDirs = useMemo(() => dirs.filter((dir) => dir.is_visible), [dirs]);
  const hasDirs = visibleDirs.length > 0;

  useEffect(() => {
    setSelectedPaths(new Set());
  }, [currentPath, setSelectedPaths]);

  const { columns, gridAreaRef } = useGridColumns(GRID_SCROLL_AREA_PADDING_X);
  const { scrollMargin: gridScrollMargin, contentRef: gridContentRef } = useScrollMargin();
  const { scrollMargin: listScrollMargin, contentRef: listContentRef } = useScrollMargin();

  const isGridView = hasDirs && viewMode !== 'list';
  const isListView = hasDirs && viewMode === 'list';

  const gridVirtualizer = useVirtualizer({
    count: isGridView ? Math.ceil(visibleDirs.length / columns) : 0,
    getScrollElement: () => document.getElementById('main-scroll'),
    estimateSize: () => GRID_ROW_HEIGHT,
    overscan: 8,
    scrollMargin: gridScrollMargin,
  });

  const listVirtualizer = useVirtualizer({
    count: isListView ? visibleDirs.length : 0,
    getScrollElement: () => document.getElementById('main-scroll'),
    estimateSize: () => LIST_ROW_HEIGHT,
    overscan: 8,
    scrollMargin: listScrollMargin,
  });

  return (
    <DirContainerWrapper
      ref={containerRef}
      onClick={onDirectoryContainerClicked}
      onMouseDown={onContainerMouseDown}
    >
      {isLoading && <LoadingOverlay>Fetching files…</LoadingOverlay>}
      {selectionBox && <SelectionBox style={selectionBox} />}

      {isListView && (
        <ListScrollArea>
          <VirtualContent ref={listContentRef} style={{ height: listVirtualizer.getTotalSize() }}>
            {listVirtualizer.getVirtualItems().map((virtualRow) => {
              const dir = visibleDirs[virtualRow.index];
              const isRenaming = checkIfRenameEnabled(fileRenamePath, dir.path);
              return (
                <VirtualRow
                  key={String(virtualRow.key)}
                  style={{ transform: `translateY(${virtualRow.start - listScrollMargin}px)` }}
                >
                  <DirectoryListItem
                    path={dir.path}
                    folderName={dir.folder_name}
                    isFolder={dir.is_dir}
                    thumbnail={dir.thumbnail}
                    isImage={dir.is_image}
                    isSelected={selectedPaths.has(dir.path)}
                    isRenaming={isRenaming}
                    fileName={isRenaming ? fileName : ''}
                    onFileNameChange={setFileName}
                    onKeyDown={onKeyDown}
                    onContextMenu={onContextMenu}
                    onFileClick={onFileClick}
                    onFileDoubleClick={onFileDoubleClick}
                  />
                </VirtualRow>
              );
            })}
          </VirtualContent>
        </ListScrollArea>
      )}

      {isGridView && (
        <GridScrollArea ref={gridAreaRef}>
          <VirtualContent ref={gridContentRef} style={{ height: gridVirtualizer.getTotalSize() }}>
            {gridVirtualizer.getVirtualItems().map((virtualRow) => {
              const rowItems = visibleDirs.slice(
                virtualRow.index * columns,
                virtualRow.index * columns + columns,
              );
              return (
                <VirtualRow
                  key={String(virtualRow.key)}
                  style={{ transform: `translateY(${virtualRow.start - gridScrollMargin}px)` }}
                >
                  <GridRow style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                    {rowItems.map((dir) => {
                      const isRenaming = checkIfRenameEnabled(fileRenamePath, dir.path);
                      return (
                        <DirectoryGridItem
                          key={dir.path}
                          path={dir.path}
                          folderName={dir.folder_name}
                          isFolder={dir.is_dir}
                          thumbnail={dir.thumbnail}
                          isImage={dir.is_image}
                          isSelected={selectedPaths.has(dir.path)}
                          isRenaming={isRenaming}
                          fileName={isRenaming ? fileName : ''}
                          onFileNameChange={setFileName}
                          onKeyDown={onKeyDown}
                          onContextMenu={onContextMenu}
                          onFileClick={onFileClick}
                          onFileDoubleClick={onFileDoubleClick}
                        />
                      );
                    })}
                  </GridRow>
                </VirtualRow>
              );
            })}
          </VirtualContent>
        </GridScrollArea>
      )}
    </DirContainerWrapper>
  );
};

export default Directory;
