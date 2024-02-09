import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { FilePropertiesType } from '../components/PropertiesModal/FilePropertiesType'

const useFileProperties = (targetPath: string) => {
  const [properties, setProperties] = useState<FilePropertiesType.Property>({
    created: '',
    extension: '',
    is_file: false,
    last_modified: '',
    location: '',
    mime_type: '',
    name: '',
  })

  const getFileProperties = async () => {
    await invoke('get_properties', {
      path: targetPath,
    }).then((res) => {
      setProperties(res as FilePropertiesType.Property)
    })

    return { targetPath }
  }

  useEffect(() => {
    getFileProperties()
  }, [])
  return { properties }
}

export { useFileProperties }
