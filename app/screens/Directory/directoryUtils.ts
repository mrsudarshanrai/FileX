const checkIfRenameEnabled = (fileRenamePath: string | null, filePath: string) => {
  if (fileRenamePath && fileRenamePath === filePath) return true;
  return false;
};

export { checkIfRenameEnabled };
