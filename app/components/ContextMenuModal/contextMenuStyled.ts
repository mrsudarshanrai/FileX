import styled, { css } from 'styled-components';
import { ContextMenuItemElement, ContextMenuWrapperProps } from './contextmenuModalType';
import { switchContextMenuItemDisabledStyle } from './utils';

const CONTEXT_MENU_ITEM_HEIGHT = 40;

const ContextMenuWrapper = styled.div<
  Omit<
    ContextMenuWrapperProps,
    | 'setShow'
    | 'targetPath'
    | 'setSorucePathToCopy'
    | 'sorucePathToCopy'
    | 'isTargetPathFile'
    | 'setFileRenamePath'
  >
>`
  ${(props) => {
    const MENU_HEIGHT = props.itemCount * CONTEXT_MENU_ITEM_HEIGHT;
    const MENU_WIDTH = 240;

    const PADDING = 10;

    return css`
      background-color: ${props.theme.bg.elevated};
      border: 1px solid ${props.theme.border.subtle};
      border-radius: ${props.theme.radius.lg};
      width: ${MENU_WIDTH}px;
      height: ${MENU_HEIGHT}px;
      position: fixed;
      z-index: 999999999;
      display: ${props.display};
      top: min(${Math.max(0, props.top + 2)}px, calc(100vh - ${MENU_HEIGHT + PADDING}px));
      left: min(${Math.max(0, props.left + 2)}px, calc(100vw - ${MENU_WIDTH + PADDING}px));
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    `;
  }}
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

export { ContextMenuWrapper, ContextMenuItem, Item, ContentMenuItemShortcut, IconContainer };
