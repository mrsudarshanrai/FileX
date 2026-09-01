export namespace IconType {
  export type Props = {
    name: IconName;
    width?: string;
    height?: string;
    fill?: string;
  };

  export type IconName =
    | 'chevron-left'
    | 'chevron-right'
    | 'close'
    | 'compact'
    | 'copy'
    | 'cut'
    | 'delete'
    | 'desktop'
    | 'documents'
    | 'downloads'
    | 'grid'
    | 'home'
    | 'list'
    | 'moon'
    | 'music'
    | 'new-folder'
    | 'open'
    | 'paste'
    | 'pictures'
    | 'properties'
    | 'rename'
    | 'select-all'
    | 'settings'
    | 'storage'
    | 'sun'
    | 'videos';
}
