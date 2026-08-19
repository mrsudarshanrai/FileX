import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
`;
const ModalContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div<{ modalHeight?: string; modalWidth?: string }>`
  width: ${({ modalWidth }) => modalWidth || '480px'};
  position: absolute;
  height: ${({ modalHeight }) => modalHeight || 'fit-content'};
  overflow: hidden;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  border: 1px solid ${({ theme }) => theme.border.subtle};
  background-color: ${({ theme }) => theme.bg.elevated};
`;
const ModalHeader = styled.div`
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.border.subtle};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  cursor: move;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

const ModalHeaderRightContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 15px;
    height: 15px;
    cursor: pointer;
    path {
      fill: ${({ theme }) => theme.text.muted};
    }

    &:hover {
      path {
        fill: ${({ theme }) => theme.text.primary};
      }
    }
  }
`;
const ModalHeaderLeftContainer = styled.div``;

const ModalBodySection = styled.section`
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 10px 15px 5px 15px;
`;

const ModalBody = styled.div`
  min-height: 100px;
  height: fit-content;
  padding-bottom: 10px;
  color: ${({ theme }) => theme.text.secondary};
`;

const ModalFooter = styled.div`
  padding: 10px 0px 5px 0px;
  width: 100%;
`;

const ModalFooterButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
`;

const ModalBodyMessage = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0;
  height: fit-content;
  color: ${({ theme }) => theme.text.primary};
`;

const Mark = styled.mark`
  background-color: transparent;
  color: ${({ theme }) => theme.status.danger};
`;

export {
  ModalWrapper,
  ModalContent,
  ModalContainer,
  ModalHeader,
  ModalHeaderRightContainer,
  ModalHeaderLeftContainer,
  ModalBody,
  ModalFooter,
  ModalFooterButtonContainer,
  ModalBodySection,
  ModalBodyMessage,
  Mark,
};
