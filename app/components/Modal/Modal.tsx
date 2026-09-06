import { useCallback, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalBody,
  ModalBodySection,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalHeaderRightContainer,
  ModalOverlay,
} from './ModalStyled';
import { useDraggable } from '@/app/hooks/useDraggable';
import ModalContext from '@/app/context/ModalContext';
import { isString } from '@/app/utils';
import { Icon } from '../Icon/Icon';

const renderContent = (content: React.ReactNode | string) =>
  isString(content) ? <p>{content}</p> : content;

const Modal = () => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalHeaderRef = useRef<HTMLDivElement>(null);
  const { show, modalFooter, modalHeader, modalBody, modalHeight, modalWidth } =
    useContext(ModalContext);

  const close = useCallback(() => show({ open: false }), [show]);

  useDraggable(modalContentRef, modalHeaderRef);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [close]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <ModalOverlay>
      <ModalContent
        ref={modalContentRef}
        modalHeight={modalHeight}
        modalWidth={modalWidth}
        role='dialog'
      >
        <ModalHeader ref={modalHeaderRef}>
          <div>{renderContent(modalHeader)}</div>
          <ModalHeaderRightContainer data-no-drag>
            <div onClick={close}>
              <Icon name='close' width='15px' height='15px' />
            </div>
          </ModalHeaderRightContainer>
        </ModalHeader>
        <ModalBodySection>
          <ModalBody>{renderContent(modalBody)}</ModalBody>
          <ModalFooter>{renderContent(modalFooter)}</ModalFooter>
        </ModalBodySection>
      </ModalContent>
    </ModalOverlay>,
    document.body,
  );
};

export default Modal;
