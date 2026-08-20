import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { IDir } from '../lib/types/dir';

type InitialData = {
  home_path: string;
  dirs: IDir.IDir[];
  places: IDir.Place[];
};

const useDir = () => {
  const [dirs, setDirs] = useState<IDir.IDir[]>([]);
  const [places, setPlaces] = useState<IDir.Place[]>([]);
  const [homePath, setHomePath] = useState('/');
  const [isLoading, setIsLoading] = useState(false);
  const [activeDir, setActiveDir] = useState<Partial<IDir.IDir>>({});

  const getFile = async (path: string, funcName = 'get_files_in_path'): Promise<unknown> =>
    await invoke(funcName, { path })
      .then((res: IDir.IDir[] | unknown) => {
        if (Array.isArray(res)) {
          setDirs(res);
        }
      })
      .finally(() => setIsLoading(false));

  useEffect(() => {
    setIsLoading(true);
    invoke('get_initial_data')
      .then((res) => {
        const { home_path, dirs, places } = res as InitialData;
        setHomePath(home_path);
        setDirs(dirs);
        setPlaces(places);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const fetch = (path: string, funcName: string) => {
    return getFile(path, funcName);
  };
  return {
    dirs,
    places,
    isLoading,
    fetch,
    homePath,
    setActiveDir,
    activeDir,
  };
};

export { useDir };
