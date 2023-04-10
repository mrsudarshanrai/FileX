import styled from 'styled-components'

const PathContainer = styled.div`
  padding: 15px 3px;
  display: flex;
  align-items: center;
  column-gap: 0.3em;
  height: 50px;
`

type IPaths = {
  isActive: boolean
}

const Paths = styled.div<IPaths>`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  span {
    cursor: pointer;
    color: ${(props) => (props.isActive && props.isActive ? '#fff' : '#aeaeae')};
    border-radius: 3px;
    padding: 4px;

    &:hover {
      color: #fff;
    }
  }
`

const ArrowIcon = styled.div`
  width: 36px;
  min-width: 36px;
  border: 1px solid #8d8f9257;
  padding: 3px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`

export { PathContainer, Paths, ArrowIcon }
