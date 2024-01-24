const useFileProperties = (targetPath: string) => {
  const properties = () => {
    return { targetPath }
  }
  return { properties }
}

export { useFileProperties }
