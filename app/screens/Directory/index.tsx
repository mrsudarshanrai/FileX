import React, { useContext, useState } from 'react'
import DirContext from '@/app/context/DirectoryContext'
import { IDir } from '@/app/lib/types/dir'
import { DirContainer, File, FileGrid, FileName, FileNameWrapper } from './DirectoryStyled'
import FileIcon from '@/app/components/FileIcon'
import { NavigationContext } from '@/app/context/NavigationContext'
import ContextMenu from '@/app/context/ContextMenu'
import { Display, DisplayEnum } from '@/app/components/ContextMenuModal/contextmenuModalType'
import { useContextMenu } from '@/app/hooks/useContextMenu'

export const isContextMenuOpen = (value: Display) => value === DisplayEnum.none

const Directory = () => {
  const { dirs, isLoading } = useContext(DirContext)
  const { navigate } = useContext(NavigationContext)
  const { show, setShow, setTargetPath, setIsTargetPathFile } = useContext(ContextMenu)

  const { openFile } = useContextMenu()
  const [selectedFile, setSelectedFile] = useState<undefined | string>(undefined)

  const onFileDoubleClick = async (path: string, isFolder: boolean) => {
    setTargetPath(path)
    setShow(DisplayEnum.none)
    if (isFolder) {
      if (isContextMenuOpen(show)) navigate(path)
    } else {
      openFile(path)
    }
  }

  const onFileClick = (filePath: string) => {
    setShow(DisplayEnum.none)
    if (isContextMenuOpen(show)) setSelectedFile(() => filePath)
  }

  const onContextMenu = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    path: string,
    isFolder: boolean,
  ) => {
    event?.preventDefault()
    if (isContextMenuOpen(show)) setSelectedFile(() => path)
    setTargetPath(path)
    setIsTargetPathFile(!isFolder)
  }

  return (
    <DirContainer>
      {isLoading && <p>Fetching files</p>}
      {dirs.map(({ folder_name, path, is_dir: isFolder, is_visible, extension }: IDir.IDirs) => {
        if (!is_visible) return null
        return (
          <FileGrid key={path} draggable={true}>
            <File
              onContextMenu={(event) => {
                onContextMenu(event, path, isFolder)
              }}
              onClick={() => onFileClick(path)}
              onDoubleClick={() => onFileDoubleClick(path, isFolder)}
            >
              <FileIcon isDir={isFolder} extension={extension} />
              <FileNameWrapper title={folder_name}>
                <FileName isSelected={selectedFile === path}>{folder_name}</FileName>
              </FileNameWrapper>
            </File>
          </FileGrid>
        )
      })}
    </DirContainer>
  )
}

export default Directory
