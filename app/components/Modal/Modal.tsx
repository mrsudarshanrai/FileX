import { useEffect, useRef } from 'react'
import { ModalContent, ModalWrapper } from './ModalStyled'
import { useDraggable } from '@/app/hooks/useDraggable'

const Modal = () => {
  const modalContentRef = useRef<HTMLDivElement>(null)
  const draggable = useDraggable(modalContentRef)

  useEffect(() => {}, [])
  return (
    <ModalWrapper>
      <ModalContent ref={modalContentRef}></ModalContent>
    </ModalWrapper>
  )
}

export default Modal
