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

export type Display = 'none' | 'block'
export type ContextMenuModal = {
  top: number
  left: number
  display: Display
}

export type ContextMenuItemT = {
  label: string
  name: string
  shortcut: string
  disabled?: boolean
}
const contextMenuItems: ContextMenuItemT[] = [
  {
    label: 'New Folder',
    name: 'newFolder',
    shortcut: 'Shift + Ctrl + N',
  },
  {
    label: 'Copy',
    name: 'copy',
    shortcut: 'Ctrl + C',
    disabled: true,
  },
  {
    label: 'Paste',
    name: 'paste',
    shortcut: 'Ctrl + P',
  },
  {
    label: 'Select All',
    name: 'selectAll',
    shortcut: 'Ctrl + A',
  },
  {
    label: 'Properties',
    name: 'properties',
    shortcut: 'Ctrl + I',
  },
]

const ContextMenuModal = (props: ContextMenuModal) => {
  const { currentPath } = useContext(NavigationContext)
  const { fetch } = useContext(DirContext)
  const { top, left, display } = props

  const onContextItemClick = async (name: string) => {
    if (name === 'newFolder') {
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
        ({ name, label, shortcut, disabled }: ContextMenuItemT, index: number) => (
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
