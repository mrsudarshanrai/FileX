import { ArrowIcon } from '../NavigationPath/PathStyled';
import { NavigationButtonType } from './NavigationButtonType';
import { Icon } from '@/app/components/Icon/Icon';

const NavigationButton = (props: NavigationButtonType.Props) => {
  const { isBackBtnDisabled, isForwardBtnDisabled, onClick } = props;
  return (
    <>
      <ArrowIcon
        disabled={isBackBtnDisabled}
        onClick={() => onClick(NavigationButtonType.NavigationTypeEnum.backward)}
        title={NavigationButtonType.NavigationTypeEnum.backward}
      >
        <Icon name='chevron-left' width='20px' height='20px' />
      </ArrowIcon>
      <ArrowIcon
        disabled={isForwardBtnDisabled}
        onClick={() => onClick(NavigationButtonType.NavigationTypeEnum.forward)}
        title={NavigationButtonType.NavigationTypeEnum.forward}
      >
        <Icon name='chevron-right' width='20px' height='20px' />
      </ArrowIcon>
    </>
  );
};

export default NavigationButton;
