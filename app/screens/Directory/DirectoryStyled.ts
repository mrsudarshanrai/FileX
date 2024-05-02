import { colors } from '@/app/theme/colors';
import styled, { css } from 'styled-components';

type FileName = {
  isSelected: boolean;
};

const DirContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 0.3em;
  column-gap: calc(100vw / 150px);
  width: 100%;
  margin: 0 auto;
  padding: 15px 0px 50px 0;
`;

const FileGrid = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 150px;
  height: 180px;
`;

const File = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-content: center;
  cursor: pointer;
  height: 100%;
  .file_icon_container {
    display: flex;
    justify-content: center;
  }
`;

const FileNameWrapper = styled.div`
  width: 100px;
  margin: 7px 0 0 0;
  display: flex;
  justify-content: center;
`;

const FileName = styled.span<FileName>`
  font-size: 15px;
  /* font-weight: 300; */
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
  word-break: break-all;
  height: fit-content;
  padding: 2px 4px;
  width: fit-content;

  ${(props) =>
    props &&
    props.isSelected &&
    css`
      background-color: #007acc;
      border-radius: 3px;
    `}
`;

const FileRenameInput = styled.input`
  text-align: center;
  background-color: ${colors.grey.grey30};
  outline: none;
  border: 1px solid ${colors.grey.grey20};
  color: #fff;
  border-radius: 4px;
  padding: 4px 0;
  height: 30px;
  width: 130px;
`;

const DirContainerWrapper = styled.div`
  height: 100%;
`;

export {
  DirContainer,
  FileGrid,
  File,
  FileNameWrapper,
  FileName,
  FileRenameInput,
  DirContainerWrapper,
};
