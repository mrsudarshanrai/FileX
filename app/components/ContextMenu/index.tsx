import { getIcons, icons } from '@/app/components/Icon/icon'
import {
  ContextMenuItem,
  ContextMenuWrapper,
  ContentMenuItemShortcut,
  Item,
} from './ContextMenuStyled'
import { useContext, useEffect, useState } from 'react'
import { NavigationContext } from '@/app/context/NavigationContext'
import { invoke } from '@tauri-apps/api/tauri'
import DirContext from '@/app/context/DirContext'
import {
  ContextMenuModalProps,
  DisplayEnum,
  IContextMenuItem,
  IContextMenuItemEnum,
} from './contextmenu.types'
import { contextMenuItems } from './contextMenuItems'
import { isOptionDisabled } from './utils'

const CONDITIONAL_ITEM = ['delete', 'copy']

const ContextMenuModal = (props: ContextMenuModalProps) => {
  const { currentPath } = useContext(NavigationContext)
  const { fetch } = useContext(DirContext)
  const { top, left, display, setShow, targetPath, setSorucePathToCopy, sorucePathToCopy } = props

  const [items, setItems] = useState<IContextMenuItem[]>([])

  const onContextItemClick = async (name: string) => {
    /** on new folder click */
    if (name === IContextMenuItemEnum.newFolder) {
      await invoke('create_folder', {
        folderPath: currentPath + '/',
      })
        .then(() => {
          fetch(currentPath, 'get_files_in_path')
          setShow(DisplayEnum.none)
        })
        .catch(console.error)
    }

    /** on file/folder delete */
    if (name === IContextMenuItemEnum.delete) {
      await invoke('delete_path', {
        path: targetPath,
      })
        .then(() => {
          fetch(currentPath, 'get_files_in_path')
          setShow(DisplayEnum.none)
        })
        .catch(console.error)
    }

    /**  on file/folder copy */
    if (name === IContextMenuItemEnum.copy) {
      setSorucePathToCopy(targetPath)
      setShow(DisplayEnum.none)
    }

    /**  on file/folder copy */
    if (name === IContextMenuItemEnum.paste) {
      await invoke('copy_to_path', {
        from: sorucePathToCopy,
        to: currentPath,
      })
        .then(() => {
          fetch(currentPath, 'get_files_in_path')
          setShow(DisplayEnum.none)
        })
        .catch(console.error)
      setShow(DisplayEnum.none)
    }
  }

  useEffect(() => {
    setItems(() => {
      const filteredItems = contextMenuItems.filter((item) => {
        if (CONDITIONAL_ITEM.includes(item.name) && typeof targetPath === 'undefined') {
          return false
        }
        return true
      })
      return filteredItems
    })
  }, [targetPath])

  return (
    <ContextMenuWrapper
      onContextMenu={(e) => e.preventDefault()}
      top={top}
      left={left}
      display={display}
      itemCount={items.length}
    >
      {items.map(({ name, label, shortcut }: IContextMenuItem, index: number) => {
        return (
          <ContextMenuItem
            key={index}
            disabled={isOptionDisabled(name, sorucePathToCopy)}
            onClick={() => onContextItemClick(name)}
          >
            <Item>
              {getIcons(name as keyof typeof icons)}
              {label}
            </Item>
            <ContentMenuItemShortcut>{shortcut}</ContentMenuItemShortcut>
          </ContextMenuItem>
        )
      })}
    </ContextMenuWrapper>
  )
}

export default ContextMenuModal
