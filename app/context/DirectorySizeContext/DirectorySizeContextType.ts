export type DirectorySizeContextType = {
  directorySize: number;
  fileCount: number;
  isFetching: boolean;
  setDirectorySizeFunc: (size: number, fileCount: number) => void;
  setIsFetchingFunc: (isFetching: boolean) => void;
};
