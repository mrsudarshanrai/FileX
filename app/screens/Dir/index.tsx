import React, { useContext, useState } from 'react'
import DirContext from '@/app/context/DirContext'
import { IDir } from '@/app/lib/types/dir'
import { DirContainer, File, FileName, FileNameWrapper } from './DirStyled'
import FileIcon from '@/app/components/FileIcon'
import ContextMenu from '@/app/context/ContextMenu'
import { Display } from '@/app/components/ContextMenu'

const isContextMenuOpen = (value: Display) => value === 'none'

const Home = () => {
  const { dirs, isLoading, navigate } = useContext(DirContext)
  const { show, setShow } = useContext(ContextMenu)
  const [selectedFile, setSelectedFile] = useState<null | number>(null)

  const onFileDoubleClick = async (path: string) => {
    setShow('none')
    if (isContextMenuOpen(show)) navigate(path)
  }

  const onFileClick = (fileIndex: number) => {
    setShow('none')
    if (isContextMenuOpen(show)) setSelectedFile(() => fileIndex)
  }

  const onContextMenu = (index: number, event?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event?.preventDefault()
    if (isContextMenuOpen(show)) setSelectedFile(() => index)
  }

  return (
    <DirContainer>
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
              onContextMenu={(event) => onContextMenu(index, event)}
            />
            <FileNameWrapper title={folder_name}>
              <FileName
                onClick={() => onFileClick(index)}
                onDoubleClick={() => onFileDoubleClick(path)}
                onContextMenu={(event) => onContextMenu(index, event)}
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
