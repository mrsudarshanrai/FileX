import { invoke } from '@tauri-apps/api/core';
import { useCallback, useEffect, useState } from 'react';
import { IDir } from '../lib/types/dir';

type InitialData = {
  home_path: string;
  dirs: IDir.IDir[];
  places: IDir.Place[];
};

const VIEW_MODE_STORAGE_KEY = 'FileX:view-mode';
const DEFAULT_VIEW_MODE: IDir.ViewMode = 'icon';

const isViewMode = (value: string | null): value is IDir.ViewMode =>
  value === 'icon' || value === 'list';

const useDir = () => {
  const [dirs, setDirs] = useState<IDir.IDir[]>([]);
  const [places, setPlaces] = useState<IDir.Place[]>([]);
  const [homePath, setHomePath] = useState('/');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewModeState] = useState<IDir.ViewMode>(DEFAULT_VIEW_MODE);
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());

  const getFile = useCallback(
    async (path: string, funcName = 'get_files_in_path'): Promise<unknown> => {
      setIsLoading(true);
      return await invoke(funcName, { path })
        .then((res: IDir.IDir[] | unknown) => {
          if (Array.isArray(res)) {
            setDirs(res);
          }
        })
        .finally(() => setIsLoading(false));
    },
    [],
  );

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

  useEffect(() => {
    const stored = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    if (isViewMode(stored)) setViewModeState(stored);
  }, []);

  const setViewMode = useCallback((mode: IDir.ViewMode) => {
    setViewModeState(mode);
    window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
  }, []);

  const fetch = useCallback(
    (path: string, funcName: string) => {
      return getFile(path, funcName);
    },
    [getFile],
  );
  return {
    dirs,
    places,
    isLoading,
    fetch,
    homePath,
    viewMode,
    setViewMode,
    selectedPaths,
    setSelectedPaths,
  };
};

export { useDir };
