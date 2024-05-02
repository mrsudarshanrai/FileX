import { PathContainer, Paths } from './PathStyled';
import { NavigationPathType } from './NavigationPathType';
import { splitByslash } from '@/app/utils';
import { Icon } from '../Icon/Icon';

const NavigationPath = (props: NavigationPathType.Props) => {
  const { path, onClick } = props;

  return (
    <PathContainer>
      {splitByslash(path)
        .filter((item) => item.length)
        .map((dir, index) => {
          return (
            <Paths
              key={index}
              isActive={splitByslash(path).length - 1 === index}
              onClick={() => onClick(path, dir)}
            >
              <Icon name='chevron-right' width='15px' height='15px' />
              <span>{dir}</span>
            </Paths>
          );
        })}
    </PathContainer>
  );
};

export default NavigationPath;
