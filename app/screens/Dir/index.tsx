import React, { useContext, useState } from 'react'
import DirContext from '@/app/context/DirContext'
import { IDir } from '@/app/lib/types/dir'
import { DirContainer, File, FileName, FileNameWrapper } from './DirStyled'
import FileIcon from '@/app/components/FileIcon'
import { NavigationContext } from '@/app/context/NavigationContext'
import ContextMenu from '@/app/context/ContextMenu'
import { Display, DisplayEnum } from '@/app/components/ContextMenu/contextmenu.types'

const isContextMenuOpen = (value: Display) => value === DisplayEnum.none

const Home = () => {
  const { dirs, isLoading } = useContext(DirContext)
  const { navigate } = useContext(NavigationContext)
  const { show, setShow, setTargetPath } = useContext(ContextMenu)
  const [selectedFile, setSelectedFile] = useState<null | number>(null)

  const onFileDoubleClick = async (path: string) => {
    setShow(DisplayEnum.none)
    if (isContextMenuOpen(show)) navigate(path)
  }

  const onFileClick = (fileIndex: number) => {
    setShow(DisplayEnum.none)
    if (isContextMenuOpen(show)) setSelectedFile(() => fileIndex)
  }

  const onContextMenu = async (
    index: number,
    event?: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    path?: string,
  ) => {
    event?.preventDefault()
    if (isContextMenuOpen(show)) setSelectedFile(() => index)
    setTargetPath(path)
  }

  return (
    <DirContainer onContextMenu={(e) => e.preventDefault()}>
      {isLoading && <p>Fetching files</p>}
      {dirs.map(({ folder_name, path, is_dir, is_visible, extension }: IDir.IDirs, index) => {
        if (!is_visible) return null
        return (
          <File key={index} draggable={true}>
            <FileIcon
              isDir={is_dir}
              extension={extension}
              onClick={() => onFileClick(index)}
              onDoubleClick={() => onFileDoubleClick(path)}
              onContextMenu={(event) => {
                onContextMenu(index, event, path)
              }}
            />
            <FileNameWrapper title={folder_name}>
              <FileName
                onClick={() => onFileClick(index)}
                onDoubleClick={() => onFileDoubleClick(path)}
                onContextMenu={(event) => onContextMenu(index, event, path)}
                isSelected={selectedFile === index}
              >
                {folder_name}
              </FileName>
            </FileNameWrapper>
          </File>
        )
      })}
    </DirContainer>
  )
}

export default Home
