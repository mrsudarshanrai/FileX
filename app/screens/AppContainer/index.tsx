import styled from 'styled-components'
import { MouseEvent } from 'react'
import ModalContext from '@/app/context/ModalContext'
import { useContext } from 'react'
import Modal from '@/app/components/Modal/Modal'

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const { options } = useContext(ModalContext)

  const onMousedown = (event: MouseEvent<HTMLDivElement>) => {
    // event.preventDefault();
  }
  return (
    <AppWrapper onClick={onMousedown}>
      {options.open && <Modal />}
      {children}
    </AppWrapper>
  )
}

export default AppContainer

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
`
