import { IDir } from '@/app/lib/types/dir'

const places = ['Home', 'Desktop', 'Documents', 'Music', 'Pictures', 'Videos']

const getSidebarDirs = (allDirs: IDir.IDirs[]) => {
  return allDirs.filter((dir) => places.includes(dir.folder_name))
}

export { getSidebarDirs }
