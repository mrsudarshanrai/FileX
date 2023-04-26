import styled from 'styled-components'

const DirContainer = styled.div`
  display: flex;
  gap: 3em;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 15px;
  row-gap: 1em;
`

const File = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  height: 125px;
  margin: 0 0 5px 0;
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
  height: 70px;
  font-size: 16px;
`

export { DirContainer, File, FileName }
