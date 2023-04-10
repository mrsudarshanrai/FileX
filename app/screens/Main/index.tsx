import React, { useContext } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { getFileIcon } from '@/app/utils'
import DirContext from '@/app/context/DirContext/indext'
import { IDir } from '@/app/lib/types/dir'

const Home = () => {
  const { dirs, isLoading, fetch, setPath } = useContext(DirContext)

  const onFClick = async (path: string) => {
    fetch(path, 'get_files_in_path')
    setPath(path)
  }

  return (
    <>
      <DirContainer>
        {isLoading && <p>Fetching files</p>}
        {dirs.map(({ folder_name, path, is_dir, is_visible, extension }: IDir.IDirs, index) => {
          if (!is_visible) return null
          return (
            <div key={index} draggable={true} onDoubleClick={() => onFClick(path)}>
              {is_dir ? (
                <Image alt='folder' src={'/assets/folder.svg'} width={60} height={60} />
              ) : (
                <Image alt='file' src={getFileIcon(extension)} width={60} height={60} />
              )}
              <h4 title={folder_name}>{folder_name}</h4>
            </div>
          )
        })}
      </DirContainer>
    </>
  )
}

export default Home

const DirContainer = styled.div`
  display: flex;
  gap: 3em;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 15px;
  row-gap: 1em;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    height: 125px;
    margin: 0 0 5px 0;

    h4 {
      font-weight: 300;
      width: 100px;
      display: -webkit-box;
      max-width: 200px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-align: center;
      word-break: break-all;
      margin: 7px 0 0 0;
      height: 70px;
      font-size: 16px;
    }
  }
`
