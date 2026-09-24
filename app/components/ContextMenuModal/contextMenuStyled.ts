import styled, { css } from 'styled-components';
import { ContextMenuItemElement } from './contextmenuModalType';
import { switchContextMenuItemDisabledStyle } from './utils';

const CONTEXT_MENU_ITEM_HEIGHT = 40;

const CONTEXT_MENU_WIDTH = 240;

const ContextMenuWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.bg.elevated};
    border: 1px solid ${theme.border.subtle};
    border-radius: ${theme.radius.lg};
    width: ${CONTEXT_MENU_WIDTH}px;
    position: fixed;
    z-index: 999999999;
    max-height: calc(100vh - 20px);
    overflow-y: auto;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  `}
`;

const ContextMenuItem = styled.div<ContextMenuItemElement>`
  ${({ disabled, theme }) => css`
    height: ${CONTEXT_MENU_ITEM_HEIGHT}px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.border.subtle};
    font-size: 13px;
    color: ${theme.text.primary};
    font-weight: 400;

    ${switchContextMenuItemDisabledStyle(disabled, theme)}
  `}
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  column-gap: 14px;
`;

const ContentMenuItemShortcut = styled.div`
  font-weight: 500;
  font-size: 11px;
  color: ${({ theme }) => theme.text.muted};
`;

const IconContainer = styled.div`
  width: 18px;
  display: flex;
  align-items: center;
`;

export {
  ContextMenuWrapper,
  ContextMenuItem,
  Item,
  ContentMenuItemShortcut,
  IconContainer,
  CONTEXT_MENU_WIDTH,
};
