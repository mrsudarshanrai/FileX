export namespace IDir {
  export type IDir = {
    path: string;
    folder_name: string;
    is_dir: boolean;
    extension: string;
    is_visible: boolean;
    thumbnail: string;
    is_image: boolean;
  };

  export type Place = {
    name: string;
    path: string;
  };

  export type DiskUsage = {
    total: number;
    used: number;
    available: number;
  };

  export type ViewMode = 'icon' | 'list';
}
