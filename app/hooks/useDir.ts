import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';
import { IDir } from '../lib/types/dir';
import { sortArrayByBoolean } from '../utils';

const useDir = (funcName?: string) => {
  const [dirs, setDirs] = useState<IDir.IDirs[]>([]);
  const [homePath, setHomePath] = useState('/');
  const [isLoading, setIsLoading] = useState(false);

  const getFile = async (path: string, funcName = 'get_all_dir'): Promise<unknown> =>
    await invoke(funcName, { path })
      .then((res: IDir.IDirs[] | unknown) => {
        if (Array.isArray(res)) {
          res.sort(sortArrayByBoolean);
          setDirs(res);
        }
      })
      .finally(() => setIsLoading(false));

  const getHomePath = async () => {
    await invoke('get_home', {}).then((path: string | unknown) => {
      if (typeof path === 'string') setHomePath(path);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getFile('null', funcName);
    getHomePath();
  }, [funcName]);

  const fetch = (path: string, funcName: string) => {
    return getFile(path, funcName);
  };
  return {
    dirs,
    isLoading,
    fetch,
    homePath,
  };
};

export { useDir };
