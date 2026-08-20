import { useContext } from 'react';
import NavigationPath from '@/app/components/NavigationPath';
import { NavigationButtonType } from '@/app/components/NavigationButton/NavigationButtonType';
import NavigationButton from '@/app/components/NavigationButton';
import { TopbarContainer } from './TopbarStyled';
import { NavigationContext } from '@/app/context/NavigationContext';
import { ArrowIcon } from '@/app/components/NavigationPath/PathStyled';
import { Icon } from '@/app/components/Icon/Icon';
import { useAppTheme } from '@/app/context/ThemeContext';

const Topbar = () => {
  const { navigate, currentPath, isForwardDisabled, isBackDisabled } =
    useContext(NavigationContext);
  const { mode, setTheme, availableThemes } = useAppTheme();

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

  const onToggleTheme = () => {
    const currentIndex = availableThemes.indexOf(mode);
    const nextMode = availableThemes[(currentIndex + 1) % availableThemes.length];
    setTheme(nextMode);
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
      <ArrowIcon onClick={onToggleTheme} title='Toggle theme'>
        <Icon name={mode === 'dark' ? 'sun' : 'moon'} width='18px' height='18px' />
      </ArrowIcon>
    </TopbarContainer>
  );
};

export default Topbar;
