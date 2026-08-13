import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { IDir } from '../lib/types/dir';
import { sortArrayByBoolean } from '../utils';

const useDir = (funcName?: string) => {
  const [dirs, setDirs] = useState<IDir.IDir[]>([]);
  const [placesDirs, setPlacesDirs] = useState<IDir.IDir[]>([]);
  const [homePath, setHomePath] = useState('/');
  const [isLoading, setIsLoading] = useState(false);
  const [activeDir, setActiveDir] = useState<Partial<IDir.IDir>>({});

  const getFile = async (
    path: string,
    funcName = 'get_all_dir',
    isInitial = false
  ): Promise<unknown> =>
    await invoke(funcName, { path })
      .then((res: IDir.IDir[] | unknown) => {
        if (Array.isArray(res)) {
          res.sort(sortArrayByBoolean);
          setDirs(res);
          if (isInitial) setPlacesDirs(res);
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
    getFile('null', funcName, true);
    getHomePath();
  }, [funcName]);

  const fetch = (path: string, funcName: string) => {
    return getFile(path, funcName);
  };
  return {
    dirs,
    placesDirs,
    isLoading,
    fetch,
    homePath,
    setActiveDir,
    activeDir,
  };
};

export { useDir };
