import { useContext } from 'react';
import NavigationPath from '@/app/components/NavigationPath';
import { useDirRoute } from '@/app/hooks/useDirRoute';
import { NavigationContext } from '@/app/context/NavigationContext';
import { NavigationButtonType } from '@/app/components/NavigationButton/NavigationButtonType';
import NavigationButton from '@/app/components/NavigationButton';
import { TopbarContainer } from './TopbarStyled';
import Button from '@/app/components/Button';

const Topbar = () => {
  const { navigate, currentPath, isBackDisabled, isForwardDisabled } =
    useContext(NavigationContext);
  const { changeDir } = useDirRoute();

  const onClick = (path: string, dir: string) => {
    const pathToRoute = changeDir(path, dir);
    navigate(pathToRoute); // set new active path
  };

  const handleNavigation = (type: NavigationButtonType.NavigationType) => {
    switch (type) {
      case NavigationButtonType.NavigationTypeEnum.backward:
        navigate(-1);
        break;
      case NavigationButtonType.NavigationTypeEnum.forward:
        navigate(1);
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
