import { getIcons, icons } from '@/app/components/Icon/icon'
import { SidebarContainer, SidebarItem, SidebarItems } from './SidebarStyled'
import { useContext, useEffect, useState } from 'react'
import DirContext from '@/app/context/DirContext'
import { getSidebarDirs } from './helper'
import { IDir } from '@/app/lib/types/dir'
import { NavigationContext } from '@/app/context/NavigationContext'

const Sidebar = () => {
  const { dirs } = useContext(DirContext)
  const { navigate, currentPath } = useContext(NavigationContext)
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
        <SidebarItem
          onClick={() => onDirClick('/home/popbob')}
          isActive={'/home/popbob' === currentPath}
        >
          {getIcons('home')}
          <span>Home</span>
        </SidebarItem>
        {sideBarDirs.map(({ folder_name, path }: IDir.IDirs, index: number) => (
          <SidebarItem key={index} onClick={() => onDirClick(path)} isActive={path === currentPath}>
            {getIcons(folder_name.toLowerCase() as keyof typeof icons)}
            <span>{folder_name}</span>
          </SidebarItem>
        ))}
      </SidebarItems>
    </SidebarContainer>
  )
}

export default Sidebar
