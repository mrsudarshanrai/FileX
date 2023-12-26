import styled, { css } from 'styled-components'

type FileName = {
  isSelected: boolean
}

const DirContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  row-gap: 1em;
  column-gap: calc(100vw / 150px);
  width: 100%;
  margin: 0 auto;
  padding-bottom: 50px;
`

const FileGrid = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 150px;
  height: 150px;
`

const File = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`

const FileNameWrapper = styled.div`
  width: 100px;
  margin: 7px 0 0 0;
  display: flex;
  justify-content: center;
`

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
`

export { DirContainer, FileGrid, File, FileNameWrapper, FileName }
