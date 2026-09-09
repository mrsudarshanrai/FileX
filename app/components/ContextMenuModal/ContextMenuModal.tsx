import { useCallback, useContext } from 'react';
import ContextMenu from '@/app/context/ContextMenu';
import { ContextMenuWrapper } from './contextMenuStyled';
import { ContextMenuItemRow } from './ContextMenuItemRow';
import { ContextMenuModalProps, DisplayEnum } from './contextmenuModalType';
import { isOptionDisabled } from './utils';
import { useVisibleItems } from './hooks/useVisibleItems';
import { useMenuActions } from './hooks/useMenuActions';
import { useMenuPosition } from './hooks/useMenuPosition';
import { useDismissMenu } from './hooks/useDismissMenu';

const ContextMenuModal = ({ top, left }: ContextMenuModalProps) => {
  const { setShow, sourcePathsToCopy } = useContext(ContextMenu);
  const items = useVisibleItems();
  const actions = useMenuActions();
  const { menuRef, position } = useMenuPosition(top, left, items.length);

  const close = useCallback(() => setShow(DisplayEnum.none), [setShow]);
  useDismissMenu(menuRef, close);

  return (
    <ContextMenuWrapper
      ref={menuRef}
      onContextMenu={(event) => event.preventDefault()}
      style={{ top: position.top, left: position.left }}
    >
      {items.map((item) => (
        <ContextMenuItemRow
          key={item.name}
          item={item}
          disabled={isOptionDisabled(item.name, sourcePathsToCopy)}
          onSelect={actions[item.name]}
        />
      ))}
    </ContextMenuWrapper>
  );
};

export default ContextMenuModal;
