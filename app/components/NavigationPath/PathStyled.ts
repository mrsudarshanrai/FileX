import styled, { css } from 'styled-components';

const NavSegment = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border-radius: ${theme.radius.md};
    background-color: ${theme.bg.surfaceHover};
    overflow: hidden;
  `}
`;

const NavDivider = styled.div`
  ${({ theme }) => css`
    width: 1px;
    height: 16px;
    background-color: ${theme.border.default};
  `}
`;

const BreadcrumbBar = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 ${theme.spacing.sm};
    border-radius: ${theme.radius.md};
    background-color: ${theme.bg.surfaceHover};
    min-width: 0;
  `}
`;

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

interface IClickableIcon {
  disabled?: boolean;
}

const ClickableIcon = styled.button<IClickableIcon>`
  ${({ theme, disabled }) => css`
    width: 32px;
    height: 32px;
    border: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    background: transparent;
    opacity: ${disabled ? 0.35 : 1};
    transition: opacity 0.15s ease;

    svg path {
      fill: ${theme.text.secondary};
    }

    ${!disabled &&
    css`
      &:hover svg path {
        fill: ${theme.text.primary};
      }
    `}
  `}
`;

export { PathContainer, Paths, ClickableIcon, NavSegment, NavDivider, BreadcrumbBar };
