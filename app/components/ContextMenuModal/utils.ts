import { css } from 'styled-components';
import { Item } from './contextMenuStyled';
import { ContextMenuItemUnion, IContextMenuItemEnum } from './contextmenuModalType';
import { Color } from '@/app/theme/colorsType';

const isOptionDisabled = (name: ContextMenuItemUnion, sorucePathToCopy: string[]) => {
  if (name === IContextMenuItemEnum.paste) {
    return sorucePathToCopy.length === 0;
  } else return false;
};

const switchContextMenuItemDisabledStyle = (disabled: boolean | undefined, theme: Color) => {
  return disabled
    ? css`
        ${Item} {
          cursor: not-allowed;
          color: ${theme.text.muted};
          svg {
            fill: ${theme.text.muted};
            path {
              fill: ${theme.text.muted};
            }
          }
        }
      `
    : css`
        &:hover {
          background-color: ${theme.bg.surfaceHover};
        }
      `;
};

export { isOptionDisabled, switchContextMenuItemDisabledStyle };
