import { useContext } from 'react';
import NavigationPath from '@/app/components/NavigationPath';
import { NavigationButtonType } from '@/app/components/NavigationButton/NavigationButtonType';
import NavigationButton from '@/app/components/NavigationButton';
import { TopbarContainer } from './TopbarStyled';
import { NavigationContext } from '@/app/context/NavigationContext';
import { ArrowIcon } from '@/app/components/NavigationPath/PathStyled';
import { Icon } from '@/app/components/Icon/Icon';
import ModalContext from '@/app/context/ModalContext';
import { SettingsModal } from '@/app/components/SettingsModal';

const Topbar = () => {
  const { navigate, currentPath, isForwardDisabled, isBackDisabled } =
    useContext(NavigationContext);
  const { show } = useContext(ModalContext);

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

  const onOpenSettings = () => {
    show({
      open: true,
      modalWidth: '700px',
      modalHeader: <h4>Settings</h4>,
      modalBody: <SettingsModal />,
    });
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
      <ArrowIcon onClick={onOpenSettings} title='Settings'>
        <Icon name='settings' width='18px' height='18px' />
      </ArrowIcon>
    </TopbarContainer>
  );
};

export default Topbar;
