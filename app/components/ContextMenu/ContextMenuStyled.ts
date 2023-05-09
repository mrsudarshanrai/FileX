import styled, { css } from 'styled-components'
import { ContextMenuModal } from '.'

const ContextMenuWrapper = styled.div<ContextMenuModal>`
  ${(props) => css`
    background-color: #464646;
    width: 230px;
    height: 240px;
    position: fixed;
    z-index: 999999999;
    display: ${props.display}px;
    top: ${props.top}px;
    left: ${props.left}px;
  `}
`

export { ContextMenuWrapper }
