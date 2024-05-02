import { colors } from '@/app/theme/colors';
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
  width: ${({ modalWidth }) => modalWidth || '500px'};
  position: absolute;
  height: ${({ modalHeight }) => modalHeight || 'fit-content'};
  position: absolute;
  overflow: hidden;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  box-shadow: -1px 0px 51px -5px rgba(0, 0, 0, 0.45);
  border: 1px solid ${({ theme }) => theme.grey.grey50};
  background-color: ${({ theme }) => theme.grey.grey100};
`;
const ModalHeader = styled.div`
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.grey.grey50};
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`;

const ModalHeaderRightContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 17px;
    height: 17px;
    cursor: pointer;
    path {
      fill: ${({ theme }) => theme.grey.grey20};
    }

    &:hover {
      path {
        fill: ${({ theme }) => theme.grey.grey10};
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
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0;
  height: fit-content;
`;

const Mark = styled.mark`
  background-color: transparent;
  color: ${colors.red.red200};
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
