import { SidebarContainer, SidebarItem, SidebarItems, SidebarTitle } from './SidebarStyled';
import { useEffect, useState } from 'react';
import { getSidebarDirs } from './helper';
import { IDir } from '@/app/lib/types/dir';
import { Icon } from '@/app/components/Icon/Icon';
import { IconType } from '@/app/components/Icon/IconType';
import { emit, listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/tauri';

type NavigationStatePayload = {
  currentPath: string;
  isForwardDisabled: boolean;
  isBackDisabled: boolean;
};

const Sidebar = () => {
  const [sideBarDirs, setSideBarDirs] = useState<IDir.IDir[]>([]);
  const [homePath, setHomePath] = useState<string>('/');
  const [currentPath, setCurrentPath] = useState<string>('/');

  useEffect(() => {
    const fetchSidebarData = async () => {
      const [dirsResponse, homeResponse] = await Promise.all([
        invoke<IDir.IDir[]>('get_all_dir', { path: 'null' }).catch(() => []),
        invoke<string>('get_home', {}).catch(() => '/'),
      ]);

      if (Array.isArray(dirsResponse)) {
        setSideBarDirs(getSidebarDirs(dirsResponse));
      }

      if (typeof homeResponse === 'string') {
        setHomePath(homeResponse);
        setCurrentPath(homeResponse);
      }
    };

    fetchSidebarData();
  }, []);

  useEffect(() => {
    let unlisten: (() => void) | undefined;

    const setupListener = async () => {
      unlisten = await listen<NavigationStatePayload>(
        'navigation_state',
        (event: { payload?: NavigationStatePayload }) => {
          if (event.payload?.currentPath) {
            setCurrentPath(event.payload.currentPath);
          }
        },
      );
    };

    setupListener();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  const onDirClick = (path: string) => {
    emit('navigation_action', { type: 'goto', path });
  };

  return (
    <SidebarContainer>
      <SidebarItems>
        <SidebarTitle>This PC</SidebarTitle>
        <SidebarItem onClick={() => onDirClick(homePath)} isActive={homePath === currentPath}>
          <Icon name='home' />
          <span>Home</span>
        </SidebarItem>
        {sideBarDirs.map(({ folder_name, path }: IDir.IDir, index: number) => (
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
