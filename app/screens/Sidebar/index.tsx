import { SidebarContainer, SidebarItem, SidebarItems, SidebarTitle } from './SidebarStyled';
import { useContext, useEffect, useState } from 'react';
import DirContext from '@/app/context/DirectoryContext';
import { getSidebarDirs } from './helper';
import { IDir } from '@/app/lib/types/dir';
import { NavigationContext } from '@/app/context/NavigationContext';
import { Icon } from '@/app/components/Icon/Icon';
import { IconType } from '@/app/components/Icon/IconType';

const Sidebar = () => {
  const { dirs, homePath } = useContext(DirContext);
  const { navigate, currentPath } = useContext(NavigationContext);
  const [sideBarDirs, setSideBarDirs] = useState<IDir.IDirs[]>([]);

  useEffect(() => {
    if (!sideBarDirs.length) setSideBarDirs(getSidebarDirs(dirs));
  }, [dirs, sideBarDirs.length]);

  const onDirClick = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarContainer>
      <SidebarItems>
        <SidebarTitle>This PC</SidebarTitle>
        <SidebarItem onClick={() => onDirClick(homePath)} isActive={homePath === currentPath}>
          <Icon name='home' />
          <span>Home</span>
        </SidebarItem>
        {sideBarDirs.map(({ folder_name, path }: IDir.IDirs, index: number) => (
          <SidebarItem key={index} onClick={() => onDirClick(path)} isActive={path === currentPath}>
            <Icon name={folder_name.toLowerCase() as IconType.IconName} />
            <span>{folder_name}</span>
          </SidebarItem>
        ))}
      </SidebarItems>
    </SidebarContainer>
  );
};

export default Sidebar;
