import styled from 'styled-components'

const ModalWrapper = styled.div`
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

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  box-shadow: -1px 0px 51px -5px rgba(0, 0, 0, 0.45);
  border: 1px solid ${({ theme }) => theme.grey.grey50};
  background-color: ${({ theme }) => theme.grey.grey100};
`

export { ModalWrapper, ModalContent }
