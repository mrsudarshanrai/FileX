import { colors } from '@/app/theme/colors'
import styled from 'styled-components'

interface IArrowIcon {
  disabled?: boolean
}

const NavigationButtonWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`

const ArrowIcon = styled.button<IArrowIcon>`
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 8px 10px;

  cursor: pointer;
  background: ${colors.black.black700};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  svg {
    width: 20px;
    height: 20px;
  }
`

export { NavigationButtonWrapper, ArrowIcon }
