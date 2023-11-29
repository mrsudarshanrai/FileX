import { colors } from '@/app/theme/colors'
import styled from 'styled-components'

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
`
const ModalContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  width: 500px;
  position: absolute;
  height: 200px;
  position: absolute;
  overflow: hidden;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  box-shadow: -1px 0px 51px -5px rgba(0, 0, 0, 0.45);
  border: 1px solid ${({ theme }) => theme.grey.grey50};
  background-color: ${({ theme }) => theme.grey.grey100};
`
const ModalHeader = styled.div`
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.grey.grey50};
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`

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
`
const ModalHeaderLeftContainer = styled.div``

const ModalBodySection = styled.section`
  display: grid;
  grid-template-rows: 1fr 1fr;
`

const ModalBody = styled.div`
  padding: 10px 15px;
  min-height: 100px;
`

const ModalFooter = styled.div`
  padding: 10px 15px 5px 15px;
  width: 100%;
`

const ModalFooterButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
`

const ModalBodyMessage = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0;
`

const Mark = styled.mark`
  background-color: transparent;
  color: ${colors.red.red200};
`

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
}
