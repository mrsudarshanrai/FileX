import React, { useContext, useState } from 'react'
import DirContext from '@/app/context/DirectoryContext'
import { IDir } from '@/app/lib/types/dir'
import { DirContainer, File, FileGrid, FileName, FileNameWrapper } from './DirectoryStyled'
import FileIcon from '@/app/components/FileIcon'
import { NavigationContext } from '@/app/context/NavigationContext'
import ContextMenu from '@/app/context/ContextMenu'
import { Display, DisplayEnum } from '@/app/components/ContextMenuModal/contextmenuModalType'

const isContextMenuOpen = (value: Display) => value === DisplayEnum.none

const Directory = () => {
  const { dirs, isLoading } = useContext(DirContext)
  const { navigate } = useContext(NavigationContext)
  const { show, setShow, setTargetPath } = useContext(ContextMenu)
  const [selectedFile, setSelectedFile] = useState<undefined | string>(undefined)

  const onFileDoubleClick = async (path: string) => {
    setShow(DisplayEnum.none)
    if (isContextMenuOpen(show)) navigate(path)
  }

  const onFileClick = (filePath: string) => {
    setShow(DisplayEnum.none)
    if (isContextMenuOpen(show)) setSelectedFile(() => filePath)
  }

  const onContextMenu = async (
    event?: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    path?: string,
  ) => {
    event?.preventDefault()
    if (isContextMenuOpen(show)) setSelectedFile(() => path)
    setTargetPath(path)
  }

  return (
    <DirContainer>
      {isLoading && <p>Fetching files</p>}
      {dirs.map(({ folder_name, path, is_dir, is_visible, extension }: IDir.IDirs) => {
        if (!is_visible) return null
        return (
          <FileGrid key={path} draggable={true}>
            <File
              onContextMenu={(event) => {
                onContextMenu(event, path)
              }}
              onClick={() => onFileClick(path)}
              onDoubleClick={() => onFileDoubleClick(path)}
            >
              <FileIcon isDir={is_dir} extension={extension} />
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
