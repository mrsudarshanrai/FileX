import React, { useContext, useState } from 'react'
import DirContext from '@/app/context/DirContext'
import { IDir } from '@/app/lib/types/dir'
import { DirContainer, File, FileName, FileNameWrapper } from './DirStyled'
import FileIcon from '@/app/components/FileIcon'

const Home = () => {
  const { dirs, isLoading, navigate } = useContext(DirContext)
  const [selectedFile, setSelectedFile] = useState<null | number>(null)

  const onFileDoubleClick = async (path: string) => {
    navigate(path)
  }

  const onFileClick = (fileIndex: number) => {
    setSelectedFile(() => fileIndex)
  }

  return (
    <DirContainer>
      {isLoading && <p>Fetching files</p>}
      {dirs.map(({ folder_name, path, is_dir, is_visible, extension }: IDir.IDirs, index) => {
        if (!is_visible) return null
        return (
          <File
            key={index}
            draggable={true}
            onDoubleClick={() => onFileDoubleClick(path)}
            onClick={() => onFileClick(index)}
          >
            <FileIcon isDir={is_dir} extension={extension} />
            <FileNameWrapper title={folder_name}>
              <FileName isSelected={selectedFile === index}>{folder_name}</FileName>
            </FileNameWrapper>
          </File>
        )
      })}
    </DirContainer>
  )
}

export default Home
