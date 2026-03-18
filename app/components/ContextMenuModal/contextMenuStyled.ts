import styled, { css } from 'styled-components';
import { ContextMenuItemElement, ContextMenuWrapperProps } from './contextmenuModalType';
import { switchContextMenuItemDisabledStyle } from './utils';

const CONTEXT_MENU_ITEM_HEIGHT = 47;

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
    const MENU_WIDTH = 260;
    
    const PADDING = 10;
    

    return css`
      background-color: ${props.theme.grey.grey90};
      border-radius: 14px;
      width: ${MENU_WIDTH}px;
      height: ${MENU_HEIGHT}px;
      position: fixed;
      z-index: 999999999;
      display: ${props.display};
      top: min(${Math.max(0, props.top + 2)}px, calc(100vh - ${MENU_HEIGHT + PADDING}px));
      left: min(${Math.max(0, props.left + 2)}px, calc(100vw - ${MENU_WIDTH + PADDING}px));
      overflow: hidden;
      cursor: pointer;
    `;
  }}
`;

const ContextMenuItem = styled.div<ContextMenuItemElement>`
  ${({ disabled, theme }) => css`
    height: ${CONTEXT_MENU_ITEM_HEIGHT}px;
    padding: 0 16px;
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(119, 119, 119, 0.17);
    font-size: 15px;
    color: #fff;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;

    ${switchContextMenuItemDisabledStyle(disabled, theme)}
  `}
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  column-gap: 18px;
`;

const ContentMenuItemShortcut = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 12px;
  word-spacing: -3px;
  color: #767676;
`;

const IconContainer = styled.div`
  width: 20px;
`;

export { ContextMenuWrapper, ContextMenuItem, Item, ContentMenuItemShortcut, IconContainer };
