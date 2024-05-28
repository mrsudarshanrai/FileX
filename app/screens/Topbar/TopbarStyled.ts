import { Theme } from '@/styles/GlobalStyles';
import styled, { css } from 'styled-components';

const TopbarContainer = styled.div<Theme>`
  ${({ theme }) => css`
    background-color: ${theme.grey.grey100};
    height: 60px;
    border: 0;
    border-bottom: 1px solid ${({ theme }) => theme.grey.grey50};
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 0.3em;
  `}
  .left_container {
    display: flex;
    align-items: center;
    column-gap: 0.3em;
    height: 100%;
  }
`;
export { TopbarContainer };
