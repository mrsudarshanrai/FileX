import styled from 'styled-components'
import { MouseEvent, useContext } from 'react'
import ContextMenu from '@/app/context/ContextMenu'

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const { ...context } = useContext(ContextMenu)

  const onMousedown = (event: MouseEvent<HTMLDivElement>) => {
    // event.preventDefault();
  }
  return <AppWrapper onClick={onMousedown}>{children}</AppWrapper>
}

export default AppContainer

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 190px 100%;
`
