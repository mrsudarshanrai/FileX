import { useTheme } from 'styled-components';
import { ContentMenuItemShortcut, ContextMenuItem, IconContainer, Item } from './contextMenuStyled';
import { IContextMenuItem } from './contextmenuModalType';
import { Icon } from '../Icon/Icon';
import { IconType } from '../Icon/IconType';
import { useAppTheme } from '@/app/context/ThemeContext';
import { Color } from '@/app/theme/colorsType';

/** items whose icon file is not named after the item itself */
const ITEM_ICON: Partial<Record<string, IconType.IconName>> = {
  deletePermanently: 'delete',
  deleteFromTrash: 'delete',
  emptyTrash: 'delete',
  moveToTrash: 'trash',
};

type ContextMenuItemRowProps = {
  item: IContextMenuItem;
  disabled: boolean;
  onSelect: () => void;
};

const ContextMenuItemRow = ({ item, disabled, onSelect }: ContextMenuItemRowProps) => {
  const { mode } = useAppTheme();
  const theme = useTheme() as Color;

  const { name, label, shortcut } = item;
  const iconFill = mode === 'dark' ? theme.text.onAccent : theme.text.secondary;

  return (
    <ContextMenuItem disabled={disabled} onClick={() => !disabled && onSelect()}>
      <Item>
        <IconContainer>
          <Icon name={ITEM_ICON[name] ?? (name as IconType.IconName)} fill={iconFill} />
        </IconContainer>
        {label}
      </Item>
      <ContentMenuItemShortcut>{shortcut}</ContentMenuItemShortcut>
    </ContextMenuItem>
  );
};

export { ContextMenuItemRow };
