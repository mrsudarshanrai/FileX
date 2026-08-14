import styled, { css } from 'styled-components';

type FileName = {
  isSelected: boolean;
};

const DirContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  padding: 20px;
  height: max-content;
`;

const FileGrid = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 8px;
    border-radius: ${theme.radius.md};
    transition: background-color 0.15s ease;
    user-select: none;

    &:hover {
      background-color: ${theme.bg.surfaceHover};
    }
  `}
`;

const File = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: pointer;

  .file_icon_container {
    padding: 10px;
    margin-bottom: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    width: 64px;
  }
`;

const FileName = styled.span<FileName>`
  ${({ theme, isSelected }) => css`
    font-size: 13px;
    color: ${theme.text.primary};
    text-align: center;
    word-break: break-word;
    padding: 2px 8px;
    border-radius: ${theme.radius.sm};
    border: 1px solid transparent;

    ${isSelected &&
    css`
      background-color: ${theme.accent.muted};
      border: 1px solid ${theme.accent.border};
    `}
  `}
`;

const FileRenameInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    font-size: 13px;
    text-align: center;
    background: ${theme.bg.elevated};
    border: 1px solid ${theme.accent.default};
    color: ${theme.text.primary};
    border-radius: ${theme.radius.sm};
    padding: 2px;
    outline: none;
  `}
`;
const FileNameWrapper = styled.div`
  width: 100px;
  margin: 7px 0 0 0;
  display: flex;
  justify-content: center;
`;

const DirContainerWrapper = styled.div`
  height: 100%;
  position: relative;
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
  DirContainer,
  FileGrid,
  File,
  FileNameWrapper,
  FileName,
  FileRenameInput,
  DirContainerWrapper,
  LoadingOverlay,
};
