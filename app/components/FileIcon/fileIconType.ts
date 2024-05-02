export namespace FileIconType {
  export type FileIconWrapper = {
    disableHover?: boolean;
  };

  export interface Props extends FileIconWrapper {
    isDir: boolean;
    extension: string;
  }
}
