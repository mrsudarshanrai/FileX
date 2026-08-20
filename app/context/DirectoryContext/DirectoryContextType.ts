import { IDir } from '@/app/lib/types/dir';

export type DirContextType = {
  dirs: IDir.IDir[];
  places: IDir.Place[];
  isLoading: boolean;
  fetch: (path: string, funcName: string) => Promise<unknown>;
  homePath: string;
};
