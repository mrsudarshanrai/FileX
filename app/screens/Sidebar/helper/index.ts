import { IDir } from '@/app/lib/types/dir'

const places = ['Home', 'Desktop', 'Documents', 'Music', 'Pictures', 'Videos', 'Downloads']
const sortByFolderName = (a: IDir.IDirs, b: IDir.IDirs) =>
  a.folder_name.localeCompare(b.folder_name)

const getSidebarDirs = (allDirs: IDir.IDirs[]) => {
  return allDirs.filter((dir) => places.includes(dir.folder_name)).sort(sortByFolderName)
}

export { getSidebarDirs }
