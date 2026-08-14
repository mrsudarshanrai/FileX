import styled, { css } from 'styled-components';

const ButtonStyled = styled.button`
  ${({ theme, disabled }) => css`
    background-color: ${theme.background};
    color: ${theme.textColor || 'white'};
    padding: 7px 14px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${theme.borderColor};
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    border-radius: 6px;
    height: fit-content;
    outline: none;
    transition: background-color 0.15s ease, border-color 0.15s ease;
    ${!disabled &&
    css`
      &:hover {
        background-color: ${theme.hoverBackground};
        border-color: ${theme.hoverBackground};
      }
      &:active,
      &:focus-visible {
        box-shadow: 0px 0px 0px 3px ${theme.shadowColor};
      }
    `}
    &:disabled {
      background-color: ${theme.disabledColor};
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}
`;

export { ButtonStyled };
