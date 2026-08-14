import styled, { css } from 'styled-components';

const PathContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2px;
  min-width: 0;
`;

const Paths = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    min-width: fit-content;

    span {
      cursor: pointer;
      border-radius: ${theme.radius.sm};
      padding: 3px 4px;
      font-size: 13px;
      color: ${theme.text.secondary};
      transition: color 0.15s ease;
    }

    span:hover {
      color: ${theme.text.primary};
    }

    svg path {
      fill: ${theme.text.muted};
    }

    &:last-child span {
      color: ${theme.text.primary};
      font-weight: 500;
    }
  `}
`;

interface IArrowIcon {
  disabled?: boolean;
}

const ArrowIcon = styled.button<IArrowIcon>`
  ${({ theme, disabled }) => css`
    width: 30px;
    min-width: 30px;
    height: 30px;
    border: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${theme.radius.md};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    background: transparent;
    opacity: ${disabled ? 0.35 : 1};
    transition: background-color 0.15s ease;

    svg path {
      fill: ${theme.text.secondary};
    }

    ${!disabled &&
    css`
      &:hover {
        background-color: ${theme.bg.surfaceHover};
      }
    `}
  `}
`;

export { PathContainer, Paths, ArrowIcon };
