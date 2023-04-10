import styled from 'styled-components'
import DirContext from '@/app/context/DirContext/indext'
import { useContext } from 'react'
import Path from '@/app/components/Path'
import { useDirRoute } from '@/app/hooks/useDirRoute'

const Header = () => {
  const { fetch, setPath, currentPath } = useContext(DirContext)
  const { changeDir } = useDirRoute()

  const onClick = (path: string, dir: string) => {
    const pathToRoute = changeDir(path, dir)

    /** TODO: maybe do change & fetch in 1 function */
    setPath(pathToRoute) // set new active path
    fetch(pathToRoute, 'get_files_in_path') // fetch files in this path
  }

  return (
    <HeadrContainer>
      <Path
        path={currentPath}
        onClick={onClick}
        routeDir={(path) => {
          console.log(path)
        }}
      />
    </HeadrContainer>
  )
}

export default Header

const HeadrContainer = styled.div`
  background-color: #242424;
  height: 50px;
  border: 0;
  border-bottom: 1px solid #8d8f9257;
`
