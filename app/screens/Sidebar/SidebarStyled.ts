import styled, { css } from 'styled-components';

type ISidebarItem = {
  isActive: boolean;
};

const SidebarContainer = styled.div`
  ${({ theme }) => css`
    border: 0;
    border-right: 1px solid ${theme.border.subtle};
    height: 100vh;
    background-color: ${theme.bg.surface};
    color: ${theme.text.primary};
    padding: ${theme.spacing.sm} 0;
  `}
`;

const SidebarItems = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 ${theme.spacing.sm};
  `}
`;

const SidebarItem = styled.div<ISidebarItem>`
  ${({ theme, isActive }) => css`
    position: relative;
    padding: 8px 10px 8px 12px;
    height: 34px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: ${theme.radius.md};
    color: ${isActive ? theme.text.primary : theme.text.secondary};
    background-color: ${isActive ? theme.accent.muted : 'transparent'};
    transition: background-color 0.15s ease, color 0.15s ease;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 6px;
      bottom: 6px;
      width: 3px;
      border-radius: ${theme.radius.pill};
      background-color: ${isActive ? theme.accent.default : 'transparent'};
    }

    &:hover {
      background-color: ${isActive ? theme.accent.muted : theme.bg.surfaceHover};
    }

    p {
      font-size: 13px;
      font-weight: ${isActive ? 500 : 400};
    }

    svg {
      margin: 0 10px 0 0;
      width: 16px;
      height: 16px;
    }
  `}
`;

const SidebarTitle = styled.h4`
  ${({ theme }) => css`
    padding: 6px 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${theme.text.muted};
  `}
`;

export { SidebarContainer, SidebarItems, SidebarItem, SidebarTitle };
