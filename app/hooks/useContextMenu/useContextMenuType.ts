export namespace UseContextMenuType {
  export enum OpenFileResponseTypeEnum {
    defaultOpenerNotFound = 'default_opener_not_found',
    mimeTypeNotFound = 'mime_type_not_found',
    unableToOpenFile = 'unable_to_open_file',
    success = 'success',
  }

  export type TrashFailure = 'cross_device' | 'not_found' | 'io';

  export type TrashOutcome = {
    path: string;
    trashed: boolean;
    reason: TrashFailure | null;
  };

  export type RestoreFailure = 'destination_exists' | 'unknown_origin' | 'io';

  export type RestoreOutcome = {
    path: string;
    restored: boolean;
    restored_to: string | null;
    reason: RestoreFailure | null;
  };
}
