import { useEffect, useState } from 'react';
import NavigationPath from '@/app/components/NavigationPath';
import { useDirRoute } from '@/app/hooks/useDirRoute';
import { NavigationButtonType } from '@/app/components/NavigationButton/NavigationButtonType';
import NavigationButton from '@/app/components/NavigationButton';
import { TopbarContainer } from './TopbarStyled';
import { emit, listen } from '@tauri-apps/api/event';

type NavigationStatePayload = {
  currentPath: string;
  isForwardDisabled: boolean;
  isBackDisabled: boolean;
};

const Topbar = () => {
  const { changeDir } = useDirRoute();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isForwardDisabled, setIsForwardDisabled] = useState<boolean>(false);
  const [isBackDisabled, setIsBackDisabled] = useState<boolean>(false);

  useEffect(() => {
    let unlisten: (() => void) | undefined;

    const setupListener = async () => {
      unlisten = await listen<NavigationStatePayload>('navigation_state', (event: {
        payload?: NavigationStatePayload;
      }) => {
        const payload = event.payload;
        if (!payload) return;

        setCurrentPath(payload.currentPath);
        setIsForwardDisabled(payload.isForwardDisabled);
        setIsBackDisabled(payload.isBackDisabled);
      });
    };

    setupListener();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  const onClick = (path: string, dir: string) => {
    const pathToRoute = changeDir(path, dir);
    emit('navigation_action', { type: 'goto', path: pathToRoute });
  };

  const handleNavigation = (type: NavigationButtonType.NavigationType) => {
    switch (type) {
      case NavigationButtonType.NavigationTypeEnum.backward:
        emit('navigation_action', { type: 'back' });
        break;
      case NavigationButtonType.NavigationTypeEnum.forward:
        emit('navigation_action', { type: 'forward' });
        break;
    }
  };

  return (
    <TopbarContainer>
      <div className='left_container'>
        <NavigationButton
          isBackBtnDisabled={isBackDisabled}
          isForwardBtnDisabled={isForwardDisabled}
          onClick={(navigationType) => handleNavigation(navigationType)}
        />
        <NavigationPath path={currentPath} onClick={onClick} />
      </div>
    </TopbarContainer>
  );
};

export default Topbar;
