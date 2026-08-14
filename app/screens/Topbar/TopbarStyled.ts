import styled, { css } from 'styled-components';

const TopbarContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.bg.surface};
    height: 52px;
    border: 0;
    border-bottom: 1px solid ${theme.border.subtle};
    padding: 0 ${theme.spacing.lg};
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: ${theme.spacing.sm};

    .left_container {
      display: flex;
      align-items: center;
      column-gap: ${theme.spacing.sm};
      height: 100%;
    }
  `}
`;
export { TopbarContainer };
