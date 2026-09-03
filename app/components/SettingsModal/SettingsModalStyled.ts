import styled, { css } from 'styled-components';

type IActive = {
  isActive: boolean;
};

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  height: 460px;
  width: 640px;
`;

const SettingsBody = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  column-gap: 4px;
`;

const CategoryList = styled.div`
  ${({ theme }) => css`
    width: 160px;
    flex-shrink: 0;
    overflow-y: auto;
    padding-right: ${theme.spacing.sm};
    border-right: 1px solid ${theme.border.subtle};
    display: flex;
    flex-direction: column;
    row-gap: 2px;
  `}
`;

const CategoryItem = styled.div<IActive>`
  ${({ theme, isActive }) => css`
    padding: 7px ${theme.spacing.sm};
    border-radius: ${theme.radius.md};
    font-size: 13px;
    font-weight: ${isActive ? 650 : 500};
    color: ${isActive ? theme.text.primary : theme.text.secondary};
    background-color: ${isActive ? theme.accent.muted : 'transparent'};
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: ${isActive ? theme.accent.muted : theme.bg.surfaceHover};
    }
  `}
`;

const SettingsContent = styled.div`
  ${({ theme }) => css`
    flex: 1;
    overflow-y: auto;
    padding: 0 ${theme.spacing.md};
    display: flex;
    flex-direction: column;
    row-gap: 22px;
  `}
`;

const CategoryTitle = styled.h3`
  ${({ theme }) => css`
    font-size: 18px;
    font-weight: 650;
    color: ${theme.text.primary};
  `}
`;

const SettingBlock = styled.div`
  ${({ theme }) => css`
    padding-left: ${theme.spacing.md};
    border-left: 2px solid ${theme.border.subtle};
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  `}
`;

const SettingLabel = styled.p`
  ${({ theme }) => css`
    font-size: 13px;
    font-weight: 650;
    color: ${theme.text.primary};
  `}
`;

const SettingDescription = styled.p`
  ${({ theme }) => css`
    font-size: 12px;
    color: ${theme.text.muted};
    margin-top: -4px;
  `}
`;

const PillGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: fit-content;
    gap: ${theme.spacing.xs};
    padding: 3px;
    background-color: ${theme.bg.surfaceHover};
    border-radius: ${theme.radius.md};
  `}
`;

const PillButton = styled.button<IActive>`
  ${({ theme, isActive }) => css`
    border: 0;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: ${theme.radius.sm};
    color: ${isActive ? theme.text.onAccent : theme.text.secondary};
    background-color: ${isActive ? theme.accent.default : 'transparent'};
    transition: background-color 0.15s ease;
  `}
`;

const SelectInput = styled.select`
  ${({ theme }) => css`
    width: fit-content;
    min-width: 200px;
    height: 32px;
    padding: 0 ${theme.spacing.sm};
    border-radius: ${theme.radius.md};
    border: 1px solid ${theme.border.subtle};
    background-color: ${theme.bg.surfaceHover};
    color: ${theme.text.primary};
    font-size: 13px;

    &:focus {
      outline: none;
      border-color: ${theme.accent.default};
    }
  `}
`;

const NumberInput = styled.input`
  ${({ theme }) => css`
    width: 80px;
    height: 32px;
    padding: 0 ${theme.spacing.sm};
    border-radius: ${theme.radius.md};
    border: 1px solid ${theme.border.subtle};
    background-color: ${theme.bg.surfaceHover};
    color: ${theme.text.primary};
    font-size: 13px;

    &:focus {
      outline: none;
      border-color: ${theme.accent.default};
    }
  `}
`;

const ToggleTrack = styled.button<IActive>`
  ${({ theme, isActive }) => css`
    position: relative;
    width: 36px;
    height: 20px;
    border: 0;
    border-radius: ${theme.radius.pill};
    background-color: ${isActive ? theme.accent.default : theme.bg.surfaceHover};
    cursor: pointer;
    transition: background-color 0.15s ease;
    flex-shrink: 0;
  `}
`;

const ToggleThumb = styled.span<IActive>`
  ${({ theme, isActive }) => css`
    position: absolute;
    top: 2px;
    left: ${isActive ? '18px' : '2px'};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${theme.text.onAccent};
    transition: left 0.15s ease;
  `}
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

export {
  SettingsWrapper,
  SettingsBody,
  CategoryList,
  CategoryItem,
  SettingsContent,
  CategoryTitle,
  SettingBlock,
  SettingLabel,
  SettingDescription,
  PillGroup,
  PillButton,
  SelectInput,
  NumberInput,
  ToggleTrack,
  ToggleThumb,
  ToggleRow,
};
