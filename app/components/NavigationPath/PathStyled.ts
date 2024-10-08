import styled from 'styled-components';

const PathContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.3em;
  background-color: #13141b;
  border-radius: 8px;
  padding: 3px 10px;
`;

const Paths = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  min-width: fit-content;
  span {
    cursor: pointer;
    border-radius: 3px;
    padding: 4px;

    &:hover {
      color: #fff;
    }
  }
`;

interface IArrowIcon {
  disabled?: boolean;
}

const ArrowIcon = styled.button<IArrowIcon>`
  width: 36px;
  min-width: 36px;
  border: 0;
  /* border: 1px solid ${({ theme }) => theme.grey.grey50}; */
  padding: 3px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  background: transparent;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export { PathContainer, Paths, ArrowIcon };
