import styled, { css } from 'styled-components'
import { FileIconType } from './fileIconType'

const FileIconWrapper = styled.div<FileIconType.FileIconWrapper>`
  filter: brightness(100%);

  ${(props) =>
    props &&
    !props.disableHover &&
    css`
      &:hover {
        filter: brightness(90%);
      }
    `}
`

export { FileIconWrapper }
