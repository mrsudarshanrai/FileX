const useDirRoute = () => {
  const changeDir = (path: string, dir: string) => {
    const pathArr = path.split('/')
    const dirIndex = pathArr.findIndex((pathDir) => pathDir === dir) + 1
    pathArr.splice(dirIndex, pathArr.length - dirIndex)
    return pathArr.join('/')
  }

  return {
    changeDir,
  }
}

export { useDirRoute }
