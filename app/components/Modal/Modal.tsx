import { useContext, useRef } from 'react'
import {
  ModalBody,
  ModalBodySection,
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
import { isString } from '@/app/utils'

const Modal_HEADER_ID = 'modal_header'

const renderContent = (content: React.ReactNode | string) => {
  if (isString(content)) return <p>{content}</p>
  return content
}

const Modal = () => {
  const modalContentRef = useRef<HTMLDivElement>(null)
  const modalHeaderRef = useRef<HTMLDivElement>(null)
  const { show, modalFooter, modalHeader, modalBody, modalHeight, modalWidth } =
    useContext(ModalContext)
  const _ = useDraggable(modalContentRef, modalHeaderRef, Modal_HEADER_ID)

  return (
    <ModalWrapper>
      <ModalContainer>
        <ModalContent ref={modalContentRef} modalHeight={modalHeight} modalWidth={modalWidth}>
          <ModalHeader id={Modal_HEADER_ID} ref={modalHeaderRef}>
            <ModalHeaderLeftContainer>{renderContent(modalHeader)}</ModalHeaderLeftContainer>
            <ModalHeaderRightContainer>
              <div
                onClick={() =>
                  show({
                    open: false,
                  })
                }
              >
                {getIcons('cross')}
              </div>
            </ModalHeaderRightContainer>
          </ModalHeader>
          <ModalBodySection>
            <ModalBody>{renderContent(modalBody)}</ModalBody>
            <ModalFooter>{renderContent(modalFooter)}</ModalFooter>
          </ModalBodySection>
        </ModalContent>
      </ModalContainer>
    </ModalWrapper>
  )
}

export default Modal
