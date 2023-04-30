import styled from 'styled-components'

type ISidebarItem = {
  isActive: boolean
}
const SidebarContainer = styled.div``

const SidebarItems = styled.div`
  display: flex;
  flex-direction: column;
`

const SidebarItem = styled.p<ISidebarItem>`
  /* margin: 6px 0; */
  /* background-color: red; */
  padding: 15px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #bbb;
  background-color: ${(props) => (props.isActive ? '#4a4a4a57' : 'transparent')};
  &:hover {
    background-color: #8d8f9257;
    transition: 0.2s;
  }
  span {
    font-size: 15px;
    font-weight: 300;
  }

  svg {
    margin: 0 6px 0 0;
    width: 18px;
    height: 18px;
  }
`

export { SidebarContainer, SidebarItems, SidebarItem }
