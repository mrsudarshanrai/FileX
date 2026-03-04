import { colors } from '@/app/theme/colors';
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  user-select: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
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
    margin-bottom: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    width: 64px;
  }
`;

const FileName = styled.span<FileName>`
  font-size: 13px;
  color: ${colors.grey.grey5};
  text-align: center;
  word-break: break-word;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid transparent;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: ${colors.blue.blue100};
      border: 1px solid ${colors.blue.blue50};
    `}
`;

const FileRenameInput = styled.input`
  width: 100%;
  font-size: 13px;
  text-align: center;
  background: ${colors.grey.grey105};
  border: 1px solid ${colors.blue.blue50};
  color: white;
  border-radius: 2px;
  padding: 2px;
  outline: none;
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
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.03), transparent 60%);
  font-size: 13px;
  color: ${colors.grey.grey10};
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
