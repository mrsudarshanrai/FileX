import styled, { css } from 'styled-components'
import { ContextMenuModal } from '.'

const ContextMenuWrapper = styled.div<ContextMenuModal>`
  ${(props) => css`
    background-color: #3a3746;
    border-radius: 14px;
    width: 230px;
    height: 240px;
    position: fixed;
    z-index: 999999999;
    display: ${props.display};
    top: ${props.top + 2}px;
    left: ${props.left + 2}px;
    overflow: hidden;
    cursor: pointer;
  `}
`

const ContextMenuItem = styled.div`
  height: 40px;
  padding: 0 21px;
  /* background-color: red; */
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(119, 119, 119, 0.17);
  font-size: 15px;
  &:hover {
    background-color: #8d8f9257;
  }
`

export { ContextMenuWrapper, ContextMenuItem }
