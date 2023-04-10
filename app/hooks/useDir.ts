import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { IDir } from '../lib/types/dir'

const sortArrayByBoolean = (x: IDir.IDirs, y: IDir.IDirs) => +y.is_dir - +x.is_dir

const useDir = (funcName?: string) => {
  const [dirs, setDirs] = useState<IDir.IDirs[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getFile = async (path: string, funcName = 'get_all_dir'): Promise<unknown> =>
    await invoke(funcName, { path })
      .then((res: IDir.IDirs[] | unknown) => {
        if (Array.isArray(res)) {
          res.sort(sortArrayByBoolean)
          setDirs(res)
        }
      })
      .finally(() => setIsLoading(false))

  useEffect(() => {
    setIsLoading(true)
    getFile('null', funcName)
  }, [funcName])

  const fetch = (path: string, funcName: string) => {
    return getFile(path, funcName)
  }
  return {
    dirs,
    isLoading,
    fetch,
  }
}

export { useDir }
