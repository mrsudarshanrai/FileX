import styled, { css } from 'styled-components'

const ButtonStyled = styled.button`
  ${({ theme, disabled }) => css`
    background-color: ${theme.background};
    color: ${theme.textColor || 'white'};
    padding: 6px 9px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${theme.borderColor};
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    border-radius: 8px;
    height: fit-content;
    outline: none;
    ${!disabled &&
    css`
      &:active,
      &:focus-visible {
        box-shadow: 0px 0px 0px 4px ${theme.shadowColor};
      }
    `}
    &:disabled {
      background-color: ${theme.disabledColor};
      cursor: not-allowed;
    }
  `}
`

export { ButtonStyled }
