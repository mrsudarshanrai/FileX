import { SidebarContainer, SidebarItem, SidebarItems, SidebarTitle } from './SidebarStyled';
import { useContext, useMemo } from 'react';
import DirContext from '@/app/context/DirectoryContext';
import { getSidebarDirs } from './helper';
import { IDir } from '@/app/lib/types/dir';
import { NavigationContext } from '@/app/context/NavigationContext';
import { Icon } from '@/app/components/Icon/Icon';
import { IconType } from '@/app/components/Icon/IconType';

const Sidebar = () => {
  const { placesDirs, homePath } = useContext(DirContext);
  const { navigate, currentPath } = useContext(NavigationContext);
  const sideBarDirs = useMemo(() => getSidebarDirs(placesDirs), [placesDirs]);

  const onDirClick = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarContainer>
      <SidebarItems>
        <SidebarTitle>This PC</SidebarTitle>
        <SidebarItem onClick={() => onDirClick(homePath)} isActive={homePath === currentPath}>
          <Icon name='home' />
          <p>Home</p>
        </SidebarItem>
        {sideBarDirs.map(({ folder_name, path }: IDir.IDir) => (
          <SidebarItem key={path} onClick={() => onDirClick(path)} isActive={path === currentPath}>
            <Icon name={folder_name.toLowerCase() as IconType.IconName} />
            <p>{folder_name}</p>
          </SidebarItem>
        ))}
      </SidebarItems>
    </SidebarContainer>
  );
};

export default Sidebar;
