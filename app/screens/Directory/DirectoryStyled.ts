import styled, { css } from 'styled-components';

const ICON_BOX_SIZE = 64;
const ICON_BOX_MARGIN_BOTTOM = 4;
const GRID_ITEM_PADDING_Y = 16;
const GRID_NAME_MARGIN_TOP = 7;
const GRID_NAME_HEIGHT = 38;
const GRID_ROW_GAP = 16;

const GRID_ITEM_HEIGHT =
  GRID_ITEM_PADDING_Y +
  ICON_BOX_SIZE +
  ICON_BOX_MARGIN_BOTTOM +
  GRID_NAME_MARGIN_TOP +
  GRID_NAME_HEIGHT;
const GRID_ROW_HEIGHT = GRID_ITEM_HEIGHT + GRID_ROW_GAP;
const LIST_ROW_HEIGHT = 44;
const GRID_COLUMN_GAP = 16;
const GRID_MIN_ITEM_WIDTH = 120;
const GRID_SCROLL_AREA_PADDING_X = 40;

const GridScrollArea = styled.div`
  padding: 20px;
`;

const ListScrollArea = styled.div`
  padding: 8px 20px;
`;

const VirtualContent = styled.div`
  position: relative;
  width: 100%;
`;

const VirtualRow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  contain: layout paint style;
`;

const GridRow = styled.div`
  display: grid;
  column-gap: ${GRID_COLUMN_GAP}px;
  height: ${GRID_ROW_HEIGHT}px;
  padding-bottom: ${GRID_ROW_GAP}px;
`;

const FileGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: ${GRID_ITEM_HEIGHT}px;
  padding: 8px;
  border-radius: var(--radius-md);
  user-select: none;
  contain: layout paint style;

  &:hover {
    background-color: var(--bg-surface-hover);
  }
`;

const File = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .file_icon_container {
    padding: 10px;
    margin-bottom: ${ICON_BOX_MARGIN_BOTTOM}px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${ICON_BOX_SIZE}px;
    width: ${ICON_BOX_SIZE}px;
  }
`;

const FileName = styled.span`
  font-size: 13px;
  color: var(--text-primary);
  text-align: center;
  word-break: break-word;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  &[data-selected='true'] {
    background-color: var(--accent-muted);
    border-color: var(--accent-border);
  }
`;

const FileRenameInput = styled.input`
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: var(--bg-elevated);
  border: 1px solid var(--accent-default);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 2px;
  outline: none;
`;

const FileNameWrapper = styled.div`
  width: 100px;
  height: ${GRID_NAME_HEIGHT}px;
  margin: ${GRID_NAME_MARGIN_TOP}px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const FileListRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  height: ${LIST_ROW_HEIGHT}px;
  padding: 0 var(--spacing-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  user-select: none;
  contain: layout paint style;

  &:hover {
    background-color: var(--bg-surface-hover);
  }

  .file_icon_container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
`;

const FileListName = styled.span`
  font-size: 13px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;

  &[data-selected='true'] {
    background-color: var(--accent-muted);
    border-color: var(--accent-border);
  }
`;

const DirContainerWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const SelectionBox = styled.div`
  ${({ theme }) => css`
    position: fixed;
    border: 1px solid ${theme.accent.default};
    background-color: ${theme.accent.muted};
    opacity: 0.5;
    pointer-events: none;
    z-index: 50;
  `}
`;

const LoadingOverlay = styled.div`
  ${({ theme }) => css`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    background: radial-gradient(circle at top, rgba(255, 255, 255, 0.03), transparent 60%);
    font-size: 13px;
    color: ${theme.text.muted};
  `}
`;

export {
  FileGrid,
  File,
  FileNameWrapper,
  FileName,
  FileRenameInput,
  DirContainerWrapper,
  LoadingOverlay,
  FileListRow,
  FileListName,
  SelectionBox,
  GridScrollArea,
  ListScrollArea,
  VirtualContent,
  VirtualRow,
  GridRow,
  GRID_ROW_HEIGHT,
  LIST_ROW_HEIGHT,
  GRID_COLUMN_GAP,
  GRID_MIN_ITEM_WIDTH,
  GRID_SCROLL_AREA_PADDING_X,
};
