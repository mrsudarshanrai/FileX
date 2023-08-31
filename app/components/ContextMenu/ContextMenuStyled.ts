import styled, { css } from 'styled-components'
import { ContextMenuModal } from '.'

type ContextMenuItem = {
  disabled: boolean | undefined
}

interface ContextMenuWrapper extends ContextMenuModal {
  itemCount: number
}

const CONTEXT_MENU_ITEM_HEIGHT = 47

const ContextMenuWrapper = styled.div<ContextMenuWrapper>`
  ${(props) => css`
    background-color: ${props.theme.grey.grey90};
    border-radius: 14px;
    width: 260px;
    height: ${props.itemCount * CONTEXT_MENU_ITEM_HEIGHT}px;
    position: fixed;
    z-index: 999999999;
    display: ${props.display};
    top: ${props.top + 2}px;
    left: ${props.left + 2}px;
    overflow: hidden;
    cursor: pointer;
  `}
`

const ContextMenuItem = styled.div<ContextMenuItem>`
  height: ${CONTEXT_MENU_ITEM_HEIGHT}px;
  padding: 0 21px;
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
  &:hover {
    background-color: ${({ theme }) => theme.grey.grey50};
  }
`

const Item = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 8px;
`

const ContentMenuItemShortcut = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 12px;
  word-spacing: -3px;
  color: #767676;
`

export { ContextMenuWrapper, ContextMenuItem, Item, ContentMenuItemShortcut }
