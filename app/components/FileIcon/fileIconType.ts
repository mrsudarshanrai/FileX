export namespace FileIconType {
  export type FileIconWrapper = {
    disableHover?: boolean;
  };

  export interface Props extends FileIconWrapper {
    thumbnail: string;
    path?: string;
    isImage?: boolean;
    size?: number;
  }
}
