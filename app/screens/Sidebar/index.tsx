import { SidebarContainer, SidebarItem, SidebarItems, SidebarTitle } from './SidebarStyled';
import { useEffect, useState } from 'react';
import { getSidebarDirs, SIDEBAR_PLACES } from './helper';
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
  const [activePlace, setActivePlace] = useState<string | null>('Home');

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
        setActivePlace('Home');
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
          const nextPath = event.payload?.currentPath;
          if (!nextPath) return;

          if (nextPath === homePath) {
            if (activePlace !== 'Home') {
              setActivePlace('Home');
            }
            return;
          }

          const matchedPlace = SIDEBAR_PLACES.find((place) => nextPath.includes(`/${place}`));

          if (matchedPlace && matchedPlace !== activePlace) {
            setActivePlace(matchedPlace);
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
  }, [activePlace, homePath]);

  const onDirClick = (path: string) => {
    emit('navigation_action', { type: 'goto', path });
  };

  return (
    <SidebarContainer>
      <SidebarItems>
        <SidebarTitle>This PC</SidebarTitle>
        <SidebarItem onClick={() => onDirClick(homePath)} isActive={activePlace === 'Home'}>
          <Icon name='home' />
          <span>Home</span>
        </SidebarItem>
        {sideBarDirs.map(({ folder_name, path }: IDir.IDir) => (
          <SidebarItem
            key={path}
            onClick={() => onDirClick(path)}
            isActive={activePlace === folder_name}
          >
            <Icon name={folder_name.toLowerCase() as IconType.IconName} />
            <p>{folder_name}</p>
          </SidebarItem>
        ))}
      </SidebarItems>
    </SidebarContainer>
  );
};

export default Sidebar;
