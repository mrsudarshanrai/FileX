import { Theme } from '@/styles/GlobalStyles';
import styled, { css } from 'styled-components';

const TopbarContainer = styled.div<Theme>`
  ${({ theme }) => css`
    background-color: ${theme.grey.grey100};
    height: 50px;
    border: 0;
    border-bottom: 1px solid ${({ theme }) => theme.grey.grey50};
    padding: 15px;
    display: flex;
    align-items: center;
    column-gap: 0.3em;
  `}
`;
export { TopbarContainer };
