import { useEffect, useState } from 'react';
import NavigationPath from '@/app/components/NavigationPath';
import { useDirRoute } from '@/app/hooks/useDirRoute';
import { NavigationButtonType } from '@/app/components/NavigationButton/NavigationButtonType';
import NavigationButton from '@/app/components/NavigationButton';
import { TopbarContainer } from './TopbarStyled';
import {
  emitNavigationActionBack,
  emitNavigationActionForward,
  emitNavigationActionGoto,
  listenNavigationState,
  type NavigationStatePayload,
} from '@/app/lib/navigationEvents';

const Topbar = () => {
  const { changeDir } = useDirRoute();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isForwardDisabled, setIsForwardDisabled] = useState<boolean>(false);
  const [isBackDisabled, setIsBackDisabled] = useState<boolean>(false);

  useEffect(() => {
    let unlisten: (() => void) | undefined;

    const setupListener = async () => {
      unlisten = await listenNavigationState((payload: NavigationStatePayload) => {
        setCurrentPath((prev) => (prev === payload.currentPath ? prev : payload.currentPath));
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
    emitNavigationActionGoto(pathToRoute);
  };

  const handleNavigation = (type: NavigationButtonType.NavigationType) => {
    switch (type) {
      case NavigationButtonType.NavigationTypeEnum.backward:
        emitNavigationActionBack();
        break;
      case NavigationButtonType.NavigationTypeEnum.forward:
        emitNavigationActionForward();
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
