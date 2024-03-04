import { getIcons } from '../Icon/icon';
import { ArrowIcon } from '../NavigationPath/PathStyled';
import { NavigationButtonType } from './NavigationButtonType';

const ARROW_LEFT = 'arrowLeft';
const ARROW_RIGHT = 'arrowRight';

const NavigationButton = (props: NavigationButtonType.Props) => {
  const { isBackBtnDisabled, isForwardBtnDisabled, onClick } = props;
  return (
    <>
      <ArrowIcon
        disabled={isBackBtnDisabled}
        onClick={() => onClick(NavigationButtonType.NavigationTypeEnum.backward)}
        title={NavigationButtonType.NavigationTypeEnum.backward}
      >
        {getIcons(ARROW_LEFT)}
      </ArrowIcon>
      <ArrowIcon
        disabled={isForwardBtnDisabled}
        onClick={() => onClick(NavigationButtonType.NavigationTypeEnum.forward)}
        title={NavigationButtonType.NavigationTypeEnum.forward}
      >
        {getIcons(ARROW_RIGHT)}
      </ArrowIcon>
    </>
  );
};

export default NavigationButton;
