import { IDir } from '@/app/lib/types/dir';
import type { Dispatch, SetStateAction } from 'react';

export type DirContextType = {
  dirs: IDir.IDir[];
  places: IDir.Place[];
  isLoading: boolean;
  fetch: (path: string, funcName: string) => Promise<unknown>;
  homePath: string;
  trashPath: string;
  bookmarks: IDir.Place[];
  viewMode: IDir.ViewMode;
  setViewMode: (mode: IDir.ViewMode) => void;
  selectedPaths: Set<string>;
  setSelectedPaths: Dispatch<SetStateAction<Set<string>>>;
};
