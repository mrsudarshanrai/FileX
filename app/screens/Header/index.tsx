import styled from 'styled-components'
import DirContext from '@/app/context/DirContext/indext'
import { useContext } from 'react'
import Path from '@/app/components/Path'
import { useDirRoute } from '@/app/hooks/useDirRoute'

const Header = () => {
  const { fetch, navigate, currentPath } = useContext(DirContext)
  const { changeDir } = useDirRoute()

  const onClick = (path: string, dir: string) => {
    const pathToRoute = changeDir(path, dir)

    /** TODO: maybe do change & fetch in 1 function */
    navigate(pathToRoute) // set new active path
    fetch(pathToRoute, 'get_files_in_path') // fetch files in this path
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
      <Path path={currentPath} onClick={onClick} routeDir={handleNavigation} />
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  background-color: #242424;
  height: 50px;
  border: 0;
  border-bottom: 1px solid #8d8f9257;
`
