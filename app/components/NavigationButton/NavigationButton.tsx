import { ArrowIcon, NavSegment, NavDivider } from '../NavigationPath/PathStyled';
import { NavigationButtonType } from './NavigationButtonType';
import { Icon } from '@/app/components/Icon/Icon';

const NavigationButton = (props: NavigationButtonType.Props) => {
  const { isBackBtnDisabled, isForwardBtnDisabled, onClick } = props;
  return (
    <NavSegment>
      <ArrowIcon
        disabled={isBackBtnDisabled}
        onClick={() => onClick(NavigationButtonType.NavigationTypeEnum.backward)}
        title={NavigationButtonType.NavigationTypeEnum.backward}
      >
        <Icon name='chevron-left' width='18px' height='18px' />
      </ArrowIcon>
      <NavDivider />
      <ArrowIcon
        disabled={isForwardBtnDisabled}
        onClick={() => onClick(NavigationButtonType.NavigationTypeEnum.forward)}
        title={NavigationButtonType.NavigationTypeEnum.forward}
      >
        <Icon name='chevron-right' width='18px' height='18px' />
      </ArrowIcon>
    </NavSegment>
  );
};

export default NavigationButton;
