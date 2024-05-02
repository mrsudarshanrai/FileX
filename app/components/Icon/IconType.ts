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
    | 'copy'
    | 'delete'
    | 'desktop'
    | 'documents'
    | 'downloads'
    | 'home'
    | 'music'
    | 'new-folder'
    | 'open'
    | 'paste'
    | 'pictures'
    | 'properties'
    | 'rename'
    | 'select-all'
    | 'videos';
}
