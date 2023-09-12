import { PathContainer, Paths } from './PathStyled'
import { NavigationPathType } from './NavigationPath.type'
import { splitByslash } from '@/app/utils'

const NavigationPath = (props: NavigationPathType.Props) => {
  const { path, onClick } = props

  return (
    <PathContainer>
      {splitByslash(path).map((dir, index) => {
        return (
          <Paths
            key={index}
            isActive={splitByslash(path).length - 1 === index}
            onClick={() => onClick(path, dir)}
          >
            <span>{dir}</span> /
          </Paths>
        )
      })}
    </PathContainer>
  )
}

export default NavigationPath
