import { IDir } from '@/app/lib/types/dir';

const SIDEBAR_PLACES = ['Home', 'Desktop', 'Documents', 'Music', 'Pictures', 'Videos', 'Downloads'];
const sortByFolderName = (a: IDir.IDir, b: IDir.IDir) => a.folder_name.localeCompare(b.folder_name);

const getSidebarDirs = (allDirs: IDir.IDir[]) => {
  return allDirs.filter((dir) => SIDEBAR_PLACES.includes(dir.folder_name)).sort(sortByFolderName);
};

export { getSidebarDirs, SIDEBAR_PLACES };
