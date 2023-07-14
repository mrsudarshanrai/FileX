import styled from 'styled-components'
import { useContext } from 'react'
import Path from '@/app/components/Path'
import { useDirRoute } from '@/app/hooks/useDirRoute'
import { NavigationContext } from '@/app/context/NavigationContext'

const Header = () => {
  const { navigate, currentPath, isBackDisabled, isForwardDisabled } = useContext(NavigationContext)
  const { changeDir } = useDirRoute()

  const onClick = (path: string, dir: string) => {
    const pathToRoute = changeDir(path, dir)
    navigate(pathToRoute) // set new active path
  }

  const handleNavigation = (type: string) => {
    switch (type) {
      case 'BACK':
        navigate(-1)
        break
      case 'FORWARD':
        navigate(1)
        break
    }
  }

  return (
    <HeaderContainer>
      <Path
        path={currentPath}
        onClick={onClick}
        routeDir={handleNavigation}
        isBackBtnDisabled={isBackDisabled}
        isForwardBtnDisabled={isForwardDisabled}
      />
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  background-color: #131212;
  height: 50px;
  border: 0;
  border-bottom: 1px solid #8d8f9257;
`
