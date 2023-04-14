import styled from 'styled-components'

type ISidebarItem = {
  isActive: boolean
}
const SidebarContainer = styled.div`
  padding: 15px 0;

  h4 {
    padding: 0 0 0 15px;
  }
`

const SidebarItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px 0 0 0;
`

const SidebarItem = styled.p<ISidebarItem>`
  /* margin: 6px 0; */
  /* background-color: red; */
  padding: 0 0 0 15px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #bbb;
  background-color: ${(props) => (props.isActive ? '#8d8f9257' : 'transparent')};
  &:hover {
    background-color: #8d8f9257;
    transition: 0.2s;
  }

  svg {
    margin: 0 6px 0 0;
    width: 18px;
    height: 18px;
  }
`

export { SidebarContainer, SidebarItems, SidebarItem }
