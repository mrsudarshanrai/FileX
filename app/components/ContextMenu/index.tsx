import { getIcons, icons } from '@/app/components/Icon/icon'
import {
  ContextMenuItem,
  ContextMenuWrapper,
  ContentMenuItemShortcut,
  Item,
} from './ContextMenuStyled'
import { useContext } from 'react'
import { NavigationContext } from '@/app/context/NavigationContext'
import { invoke } from '@tauri-apps/api/tauri'
import DirContext from '@/app/context/DirContext'
import { ContextMenuModalProps, IContextMenuItem, IContextMenuItemEnum } from './contextmenu.types'
import { contextMenuItems } from './contextMenuItems'

const ContextMenuModal = (props: ContextMenuModalProps) => {
  const { currentPath } = useContext(NavigationContext)
  const { fetch } = useContext(DirContext)
  const { top, left, display } = props

  const onContextItemClick = async (name: string) => {
    if (name === IContextMenuItemEnum.newFolder) {
      await invoke('create_folder', {
        folderPath: currentPath + '/',
      })
        .then(() => {
          fetch(currentPath, 'get_files_in_path')
        })
        .catch(console.error)
    }
  }

  return (
    <ContextMenuWrapper
      onContextMenu={(e) => e.preventDefault()}
      top={top}
      left={left}
      display={display}
      itemCount={contextMenuItems.length}
    >
      {contextMenuItems.map(
        ({ name, label, shortcut, disabled }: IContextMenuItem, index: number) => (
          <ContextMenuItem key={index} disabled={disabled} onClick={() => onContextItemClick(name)}>
            <Item>
              {getIcons(name as keyof typeof icons)}
              {label}
            </Item>
            <ContentMenuItemShortcut>{shortcut}</ContentMenuItemShortcut>
          </ContextMenuItem>
        ),
      )}
    </ContextMenuWrapper>
  )
}

export default ContextMenuModal
