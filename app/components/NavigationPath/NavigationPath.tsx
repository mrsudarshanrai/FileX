import { PathContainer, Paths } from './PathStyled';
import { NavigationPathType } from './NavigationPathType';
import { splitByslash } from '@/app/utils';

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
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.72001 18.78C8.57956 18.6394 8.50067 18.4488 8.50067 18.25C8.50067 18.0513 8.57956 17.8606 8.72001 17.72L14.44 12L8.72001 6.28001C8.5876 6.13774 8.5155 5.94969 8.51886 5.75538C8.52221 5.56106 8.60077 5.37561 8.73801 5.23801C8.87561 5.10076 9.06106 5.02221 9.25538 5.01885C9.4497 5.01549 9.63775 5.0876 9.78001 5.22001L16.03 11.47C16.1705 11.6106 16.2494 11.8013 16.2494 12C16.2494 12.1988 16.1705 12.3894 16.03 12.53L9.78001 18.78C9.63939 18.9205 9.44876 18.9993 9.25001 18.9993C9.05126 18.9993 8.86064 18.9205 8.72001 18.78Z'
                  fill='#dddddd95'
                />
              </svg>{' '}
              <span>{dir}</span>
            </Paths>
          );
        })}
    </PathContainer>
  );
};

export default NavigationPath;
