import { colors } from '@/app/theme/colors'
import styled from 'styled-components'

const PathContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.3em;
  background-color: ${colors.black.black700};
  border-radius: 8px;
  padding: 3px 10px;
`

type IPaths = {
  isActive: boolean
}

const Paths = styled.div<IPaths>`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  min-width: fit-content;
  p {
    cursor: pointer;
    color: ${(props) => (props.isActive && props.isActive ? '#fff' : '#aeaeae')};
    border-radius: 3px;
    padding: 4px;
    &:hover {
      color: #fff;
    }
  }
`

export { PathContainer, Paths }
