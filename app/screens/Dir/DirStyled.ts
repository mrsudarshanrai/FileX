import styled from 'styled-components'

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

const File = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  width: 150px;
  height: 150px;
`

const FileName = styled.div`
  font-weight: 300;
  width: 100px;
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
  word-break: break-all;
  margin: 7px 0 0 0;
  height: 100%;
  font-size: 15px;
`

export { DirContainer, File, FileName }
