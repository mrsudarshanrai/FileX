import { css } from 'styled-components'
import { Item } from './contextMenuStyled'
import { ContextMenuItemUnion, IContextMenuItemEnum } from './contextmenuModalType'
import { Color } from '@/app/theme/colorsType'

const isOptionDisabled = (name: ContextMenuItemUnion, targetPath: string | undefined) => {
  if (name === IContextMenuItemEnum.paste) {
    if (targetPath) {
      return false
    } else return true
  } else return false
}

const switchContextMenuItemDisabledStyle = (disabled: boolean | undefined, theme: Color) => {
  return disabled
    ? css`
        ${Item} {
          color: ${theme.grey.grey20};
          svg {
            fill: ${theme.grey.grey20};
            path {
              fill: ${theme.grey.grey20};
            }
          }
        }
      `
    : css`
        &:hover {
          background-color: ${theme.grey.grey50};
        }
      `
}

export { isOptionDisabled, switchContextMenuItemDisabledStyle }
