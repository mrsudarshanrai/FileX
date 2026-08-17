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
    display: flex;
    flex-direction: column;
  `}
`;

const SidebarHeader = styled.div`
  ${({ theme }) => css`
    height: 52px;
    min-height: 52px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 13px;
    color: ${theme.text.primary};
    padding: ${theme.spacing.lg} ${theme.spacing.sm} ${theme.spacing.sm};

    p {
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: ${theme.text.primary};
    }
  `}
`;

const SidebarItems = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: ${theme.spacing.md} ${theme.spacing.sm} ${theme.spacing.sm};
  `}
`;

const SidebarItem = styled.div<ISidebarItem>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    padding: 5px ${theme.spacing.sm} 5px 5px;
    height: 36px;
    cursor: pointer;
    border-radius: ${theme.radius.md};
    background-color: ${isActive ? theme.accent.muted : 'transparent'};
    transition: background-color 0.15s ease;

    &:hover {
      background-color: ${isActive ? theme.accent.muted : theme.bg.surfaceHover};
    }

    p {
      font-size: 13px;
      font-weight: 600;
      color: ${isActive ? theme.text.primary : theme.text.secondary};
    }
  `}
`;

const IconChip = styled.div<ISidebarItem>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    border-radius: ${theme.radius.sm};
    background-color: ${isActive ? theme.accent.default : 'transparent'};
    transition: background-color 0.5s ease;

    svg {
      /* width: 15px;1 */
      /* height: 15px; */
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

export { SidebarContainer, SidebarHeader, SidebarItems, SidebarItem, IconChip, SidebarTitle };
