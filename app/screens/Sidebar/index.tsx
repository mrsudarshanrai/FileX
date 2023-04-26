import { getIcons, icons } from '@/app/components/Icon/icon'
import { SidebarContainer, SidebarItem, SidebarItems } from './SidebarStyled'
import { useContext, useEffect, useState } from 'react'
import DirContext from '@/app/context/DirContext'
import { getSidebarDirs } from './helper'
import { IDir } from '@/app/lib/types/dir'

const Sidebar = () => {
  const { dirs, navigate, currentPath } = useContext(DirContext)
  const [sideBarDirs, setSideBarDirs] = useState<IDir.IDirs[]>([])

  useEffect(() => {
    if (!sideBarDirs.length) setSideBarDirs(getSidebarDirs(dirs))
  }, [dirs, sideBarDirs.length])

  const onDirClick = (path: string) => {
    navigate(path)
  }

  return (
    <SidebarContainer>
      <SidebarItems>
        {sideBarDirs.map(({ folder_name, path }: IDir.IDirs, index: number) => (
          <SidebarItem key={index} onClick={() => onDirClick(path)} isActive={path === currentPath}>
            {getIcons(folder_name.toLowerCase() as keyof typeof icons)}
            {folder_name}
          </SidebarItem>
        ))}
      </SidebarItems>
    </SidebarContainer>
  )
}

export default Sidebar
