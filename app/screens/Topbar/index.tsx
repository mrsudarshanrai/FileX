import { useContext } from 'react';
import NavigationPath from '@/app/components/NavigationPath';
import { NavigationButtonType } from '@/app/components/NavigationButton/NavigationButtonType';
import NavigationButton from '@/app/components/NavigationButton';
import { TopbarContainer } from './TopbarStyled';
import { NavigationContext } from '@/app/context/NavigationContext';

const Topbar = () => {
  const { navigate, currentPath, isForwardDisabled, isBackDisabled } =
    useContext(NavigationContext);

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
        <NavigationPath path={currentPath} onClick={navigate} />
      </div>
    </TopbarContainer>
  );
};

export default Topbar;
