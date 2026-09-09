import { useEffect, useRef, useState } from 'react';
import { invoke, convertFileSrc } from '@tauri-apps/api/core';
import { FileIconType } from './fileIconType';
import { FileIconWrapper } from './fileIconStyled';

/** custom icon theme -> /extensions and /assets
 * convertFileSrc -> path borrowed from the desktop icon theme, which the webview cannot load directly. */
const BUNDLED_ICON = /^\/(extensions|assets)\//;

const iconSrc = (thumbnail: string) =>
  BUNDLED_ICON.test(thumbnail) ? thumbnail : convertFileSrc(thumbnail);

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
  const src = showPreview ? (previewSrc as string) : iconSrc(thumbnail);

  return (
    <FileIconWrapper
      ref={wrapperRef}
      data-preview={showPreview}
      data-hover-disabled={disableHover}
      style={showPreview ? { width: size, height: size } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={src}
        alt='file icon'
        src={src}
        width={size}
        height={size}
        decoding='async'
        draggable={false}
        onError={() => setPreviewSrc(null)}
      />
    </FileIconWrapper>
  );
};

export default FileIcon;
