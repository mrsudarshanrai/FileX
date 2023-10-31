import { useContext, useRef } from 'react'
import {
  ModalBody,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalHeaderLeftContainer,
  ModalHeaderRightContainer,
  ModalWrapper,
} from './ModalStyled'
import { useDraggable } from '@/app/hooks/useDraggable'
import { getIcons } from '../Icon/icon'
import ModalContext from '@/app/context/ModalContext'

const Modal_HEADER_ID = 'modal_header'

const Modal = () => {
  const modalContentRef = useRef<HTMLDivElement>(null)
  const modalHeaderRef = useRef<HTMLDivElement>(null)
  const { show } = useContext(ModalContext)
  const _ = useDraggable(modalContentRef, modalHeaderRef, Modal_HEADER_ID)

  return (
    <ModalWrapper>
      <ModalContainer>
        <ModalContent ref={modalContentRef}>
          <ModalHeader id={Modal_HEADER_ID} ref={modalHeaderRef}>
            <ModalHeaderLeftContainer>
              <p>Lorem</p>
            </ModalHeaderLeftContainer>
            <ModalHeaderRightContainer>
              <div
                onClick={() =>
                  show({
                    options: {
                      open: false,
                    },
                  })
                }
              >
                {getIcons('cross')}
              </div>
            </ModalHeaderRightContainer>
          </ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam illo saepe eligendi
            debitis neque voluptatibus sint autem laborum nisi ea hic, harum omnis? Eaque natus
            rerum expedita quibusdam impedit! Suscipit.
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </ModalContainer>
    </ModalWrapper>
  )
}

export default Modal
