import React, { useContext } from 'react'
import Image from 'next/image'
import { getFileIcon } from '@/app/utils'
import DirContext from '@/app/context/DirContext'
import { IDir } from '@/app/lib/types/dir'
import { DirContainer, File, FileName } from './DirStyled'

const Home = () => {
  const { dirs, isLoading, navigate } = useContext(DirContext)

  const onFClick = async (path: string) => {
    navigate(path)
  }

  return (
    <DirContainer>
      {isLoading && <p>Fetching files</p>}
      {dirs.map(({ folder_name, path, is_dir, is_visible, extension }: IDir.IDirs, index) => {
        if (!is_visible) return null
        return (
          <File key={index} draggable={true} onDoubleClick={() => onFClick(path)}>
            {is_dir ? (
              <Image alt='folder' src={'/assets/folder.svg'} width={80} height={80} />
            ) : (
              <Image alt='file' src={getFileIcon(extension)} width={80} height={80} />
            )}
            <FileName title={folder_name}>{folder_name}</FileName>
          </File>
        )
      })}
    </DirContainer>
  )
}

export default Home
