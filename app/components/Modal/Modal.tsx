import { useRef } from 'react'
import { ModalContainer, ModalContent, ModalWrapper } from './ModalStyled'
import { useDraggable } from '@/app/hooks/useDraggable'

const Modal = () => {
  const modalContentRef = useRef<HTMLDivElement>(null)
  const draggable = useDraggable(modalContentRef)

  return (
    <ModalWrapper>
      <ModalContainer>
        <ModalContent ref={modalContentRef}></ModalContent>
      </ModalContainer>
    </ModalWrapper>
  )
}

export default Modal
