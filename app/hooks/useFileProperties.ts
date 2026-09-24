import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { FilePropertiesType } from '../components/PropertiesModal/FilePropertiesType';

const EMPTY_PROPERTIES: FilePropertiesType.Property = {
  created: '',
  extension: '',
  is_file: false,
  last_modified: '',
  location: '',
  mime_type: '',
  name: '',
  size: 0,
  thumbnail: '/assets/file.svg',
};

const useFileProperties = (targetPath: string) => {
  const [properties, setProperties] = useState<FilePropertiesType.Property>(EMPTY_PROPERTIES);

  useEffect(() => {
    let cancelled = false;

    invoke('get_properties', { path: targetPath })
      .then((res) => {
        if (!cancelled) setProperties(res as FilePropertiesType.Property);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [targetPath]);

  return { properties };
};

export { useFileProperties };
