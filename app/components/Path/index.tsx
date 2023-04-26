import { IRouteDir } from '@/app/hooks/useDirRoute'
import { getIcons } from '../Icon/icon'
import { PathContainer, Paths, ArrowIcon } from './PathStyled'

type IPath = {
  path: string
  onClick: (path: string, dir: string) => void
  routeDir: (path: IRouteDir) => void
  isBackBtnDisabled: boolean
  isForwardBtnDisabled: boolean
}

const splitPath = (path: string) => {
  if (typeof path === 'string') return path.split('/')
  else throw `Invalid path provided splitPath(path:string), found ${typeof path}`
}

const Path = (props: IPath) => {
  const { path, onClick, routeDir, isBackBtnDisabled, isForwardBtnDisabled } = props

  return (
    <PathContainer>
      <ArrowIcon title='back' onClick={() => routeDir('BACK')} disabled={isBackBtnDisabled}>
        {getIcons('arrowLeft')}
      </ArrowIcon>
      <ArrowIcon
        title='forward'
        onClick={() => routeDir('FORWARD')}
        disabled={isForwardBtnDisabled}
      >
        {getIcons('arrowRight')}
      </ArrowIcon>
      {splitPath(path).map((dir, index) => {
        return (
          <Paths
            key={index}
            isActive={splitPath(path).length - 1 === index}
            onClick={() => onClick(path, dir)}
          >
            <span>{dir}</span> /
          </Paths>
        )
      })}
    </PathContainer>
  )
}

export default Path
