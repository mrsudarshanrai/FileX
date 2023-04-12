import { getIcons, icons } from '@/app/components/Icon/icon'
import { SidebarContainer, SidebarItem, SidebarItems } from './SidebarStyled'
import { useContext, useEffect, useState } from 'react'
import DirContext from '@/app/context/DirContext'
import { getSidebarDirs } from './helper'
import { IDir } from '@/app/lib/types/dir'

const Sidebar = () => {
  const { dirs, navigate } = useContext(DirContext)
  const [sideBarDirs, setSideBarDirs] = useState<IDir.IDirs[]>([])

  useEffect(() => {
    if (!sideBarDirs.length) setSideBarDirs(getSidebarDirs(dirs))
  }, [dirs, sideBarDirs.length])

  const onDirClick = (path: string) => {
    navigate(path)
  }

  return (
    <SidebarContainer>
      <h4>Places</h4>
      <SidebarItems>
        {sideBarDirs.map((dir: IDir.IDirs, index: number) => (
          <SidebarItem key={index} onClick={() => onDirClick(dir.path)}>
            {getIcons(dir.folder_name.toLowerCase() as keyof typeof icons)}
            {dir.folder_name}
          </SidebarItem>
        ))}
      </SidebarItems>
    </SidebarContainer>
  )
}

export default Sidebar
