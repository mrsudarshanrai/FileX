import { PathContainer, Paths } from './PathStyled'
import { NavigationPathType } from './NavigationPath.type'
import { splitByslash } from '@/app/utils'
import { icons } from '../Icon/icon'

const NavigationPath = (props: NavigationPathType.Props) => {
  const { path, onClick } = props

  console.log('path', splitByslash(path))
  return (
    <PathContainer>
      {splitByslash(path)
        .filter((item) => item.length)
        .map((dir, index) => {
          return (
            <Paths
              key={index}
              isActive={splitByslash(path)[splitByslash(path).length - 1] === dir}
              onClick={() => onClick(path, dir)}
            >
              {icons.chevron}
              <p>{dir}</p>
            </Paths>
          )
        })}
    </PathContainer>
  )
}

export default NavigationPath
