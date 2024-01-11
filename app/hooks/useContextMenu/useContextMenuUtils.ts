const openFileErrorModalMessage: { [key: string]: (filename: string) => string } = {
  default_opener_not_found: (filename: string) =>
    `The File "${filename}" has no known program associated with it. Use the open with dialog to  pick a program to open it with.`,
  mime_type_not_found: (filename: string) =>
    `Unable to determine the MIME type for the file "${filename}".`,
  unable_to_open_file: (filename: string) =>
    `Unable to locate the file "${filename}" on your system. Please ensure the file exists and try again.`,
}

export { openFileErrorModalMessage }
