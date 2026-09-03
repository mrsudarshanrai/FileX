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
    column-gap: ${theme.spacing.sm};
    font-size: 13px;
    color: ${theme.text.primary};
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    border-bottom: 1px solid ${theme.border.subtle};

    p {
      font-size: 14.5px;
      font-weight: 650;
      letter-spacing: 0.01em;
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
    border-radius: ${theme.radius.lg};
    background-color: ${isActive ? theme.accent.muted : 'transparent'};

    &:hover {
      background-color: ${isActive ? theme.accent.muted : theme.bg.surfaceHover};
    }

    p {
      font-size: 13px;
      font-weight: ${isActive ? 650 : 500};
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
    border-radius: ${theme.radius.md};
    background-color: ${isActive ? theme.accent.default : 'transparent'};
  `}
`;

const SidebarTitle = styled.h4`
  ${({ theme }) => css`
    padding: ${theme.spacing.lg} ${theme.spacing.sm} ${theme.spacing.xs};
    font-size: 10.5px;
    font-weight: 650;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${theme.text.muted};
  `}
`;

const SidebarFooter = styled.div`
  ${({ theme }) => css`
    margin: ${theme.spacing.sm};
    margin-top: auto;
    padding: ${theme.spacing.md};
    background-color: ${theme.bg.elevated};
    border: 1px solid ${theme.border.subtle};
    border-radius: ${theme.radius.lg};
  `}
`;

const StorageHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing.xs};

    span:first-child {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.xs};
      font-size: 12px;
      font-weight: 600;
      color: ${theme.text.secondary};
    }

    span:last-child {
      font-size: 12px;
      font-weight: 600;
      color: ${theme.text.muted};
    }
  `}
`;

const ProgressTrack = styled.div`
  ${({ theme }) => css`
    height: 6px;
    border-radius: ${theme.radius.sm};
    background-color: ${theme.bg.surfaceHover};
    overflow: hidden;
  `}
`;

const ProgressFill = styled.div<{ percent: number }>`
  ${({ theme, percent }) => css`
    height: 100%;
    width: ${percent}%;
    border-radius: ${theme.radius.sm};
    background-color: ${theme.accent.default};
    transition: width 0.3s ease;
  `}
`;

const StorageDetail = styled.p`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.xs};
    font-size: 11px;
    color: ${theme.text.muted};
  `}
`;

export {
  SidebarContainer,
  SidebarHeader,
  SidebarItems,
  SidebarItem,
  IconChip,
  SidebarTitle,
  SidebarFooter,
  StorageHeading,
  ProgressTrack,
  ProgressFill,
  StorageDetail,
};
