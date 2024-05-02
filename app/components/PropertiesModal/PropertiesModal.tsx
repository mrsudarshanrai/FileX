import { useFileProperties } from '@/app/hooks/useFileProperties';
import { Info, PropertiesModalWrapper } from './PropertiesModalStyled';
import FileIcon from '../FileIcon';
import { useContext } from 'react';
import DirectorySizeContext from '@/app/context/DirectorySizeContext/DirectorySizeContext';
import { getFileSize } from './PropertiesModalUtils';

const PropertiesModal = (props: { path: string }) => {
  const { properties } = useFileProperties(props.path);
  const { name, extension, is_file, created, last_modified, mime_type, location, size } =
    properties || {};
  const { fileCount, directorySize, isFetching } = useContext(DirectorySizeContext);

  return (
    <PropertiesModalWrapper>
      <div>
        <FileIcon extension={extension} isDir={!is_file} />
      </div>
      <div className='file_info_container'>
        <Info>
          <h4>Name:</h4>
          <p>{name}</p>
        </Info>
        <Info>
          <h4>Type:</h4>
          <p>
            {is_file ? 'File' : 'Folder'} ({mime_type})
          </p>
        </Info>
        {!is_file && (
          <Info>
            <h4>Contents:</h4>
            <p>{isFetching ? 'Calculating...' : `${fileCount} items`}</p>
          </Info>
        )}
        <Info>
          <h4>Size:</h4>
          <p>{`${isFetching ? 'Calculating...' : getFileSize(is_file, directorySize, size)}`}</p>
        </Info>
        <Info>
          <h4>Location:</h4>
          <p title={location}>{location}</p>
        </Info>
        <Info>
          <h4>Created:</h4>
          <p>{new Date(created).toUTCString()}</p>
        </Info>
        <Info>
          <h4>Last Modified:</h4>
          <p>{new Date(last_modified).toUTCString()}</p>
        </Info>
      </div>
    </PropertiesModalWrapper>
  );
};

export { PropertiesModal };
