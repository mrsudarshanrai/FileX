import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { invoke, convertFileSrc } from '@tauri-apps/api/core';
import { FileIconType } from './fileIconType';
import { FileIconWrapper } from './fileIconStyled';

const FileIcon = (props: FileIconType.Props) => {
  const { thumbnail, path, isImage, disableHover = false, size = 80 } = props;
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreviewSrc(null);
    if (!isImage || !path) return;

    const element = wrapperRef.current;
    if (!element) return;

    let cancelled = false;

    const fetchThumbnail = () => {
      invoke('get_thumbnail', { path })
        .then((cachePath) => {
          if (!cancelled && typeof cachePath === 'string') {
            setPreviewSrc(convertFileSrc(cachePath));
          }
        })
        .catch((error) => {
          console.error('get_thumbnail failed', path, error);
        });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          fetchThumbnail();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(element);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [path, isImage]);

  const showPreview = Boolean(isImage && previewSrc);
  const src = showPreview ? (previewSrc as string) : thumbnail;

  return (
    <FileIconWrapper ref={wrapperRef} disableHover={disableHover} isImage={showPreview} size={size}>
      <Image
        key={src}
        alt='file icon'
        src={src}
        width={size}
        height={size}
        onError={(error) => {
          console.error('thumbnail image failed to load', src, error);
          setPreviewSrc(null);
        }}
      />
    </FileIconWrapper>
  );
};

export default FileIcon;
