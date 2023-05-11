import styled from 'styled-components'
import { MouseEvent } from 'react'

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const onMousedown = (event: MouseEvent<HTMLDivElement>) => {
    // event.preventDefault();
  }
  return <AppWrapper onClick={onMousedown}>{children}</AppWrapper>
}

export default AppContainer

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
`
