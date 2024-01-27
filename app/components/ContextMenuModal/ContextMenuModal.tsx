import { getIcons, icons } from '@/app/components/Icon/icon'
import {
  ContextMenuItem,
  ContextMenuWrapper,
  ContentMenuItemShortcut,
  Item,
  IconContainer,
} from './contextMenuStyled'
import { useContext, useEffect, useState } from 'react'
import { NavigationContext } from '@/app/context/NavigationContext'
import { invoke } from '@tauri-apps/api/tauri'
import DirContext from '@/app/context/DirectoryContext'
import {
  ContextMenuModalProps,
  DisplayEnum,
  IContextMenuItem,
  IContextMenuItemEnum,
} from './contextmenuModalType'
import { contextMenuItems } from './contextMenuItems'
import { isOptionDisabled } from './utils'
import { toast } from 'react-hot-toast'
import { useContextMenu } from '@/app/hooks/useContextMenu'

const CONDITIONAL_ITEM = ['delete', 'copy', 'open']

const ContextMenuModal = (props: ContextMenuModalProps) => {
  const { currentPath, navigate } = useContext(NavigationContext)
  const { fetch } = useContext(DirContext)
  const { deleteFile, showFileProperties, openFile } = useContextMenu()
  const {
    top,
    left,
    display,
    setShow,
    targetPath,
    setSorucePathToCopy,
    sorucePathToCopy,
    isTargetPathFile,
  } = props

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
      deleteFile()
    }

    /**  on file/folder copy */
    if (name === IContextMenuItemEnum.copy) {
      setSorucePathToCopy(targetPath)
      setShow(DisplayEnum.none)
    }

    /**  on properties view */
    if (name === IContextMenuItemEnum.properties) {
      if (targetPath || currentPath) {
        setSorucePathToCopy(targetPath)
        setShow(DisplayEnum.none)
        showFileProperties(targetPath || currentPath)
      }
    }

    if (name === IContextMenuItemEnum.open) {
      setShow(DisplayEnum.none)
      if (targetPath) {
        if (isTargetPathFile) openFile(targetPath)
        else navigate(targetPath)
      }
    }

    /**  on file/folder paste */
    if (name === IContextMenuItemEnum.paste) {
      const toastId = toast.loading('Copying')
      setShow(DisplayEnum.none)

      await invoke('copy_to_path', {
        from: sorucePathToCopy,
        to: currentPath,
      })
        .then(() => {
          fetch(currentPath, 'get_files_in_path')
        })
        .catch(console.error)
        .finally(() =>
          toast.success('The file has been successfully copied.', {
            id: toastId,
          }),
        )
      setShow(DisplayEnum.none)
    }
  }

  useEffect(() => {
    setItems(() => {
      const filteredItems = contextMenuItems.filter((item) => {
        if (CONDITIONAL_ITEM.includes(item.name) && typeof targetPath === 'undefined') {
          return false
        }
        if (item.name === 'newFolder' && targetPath) {
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
            onClick={() => !isOptionDisabled(name, sorucePathToCopy) && onContextItemClick(name)}
          >
            <Item>
              <IconContainer>{getIcons(name as keyof typeof icons)}</IconContainer>
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
