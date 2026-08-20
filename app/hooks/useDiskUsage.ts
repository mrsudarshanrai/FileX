import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { useEffect, useState } from 'react';
import { IDir } from '../lib/types/dir';

const POLL_INTERVAL = 30000;

const useDiskUsage = () => {
  const [diskUsage, setDiskUsage] = useState<IDir.DiskUsage | null>(null);

  useEffect(() => {
    const fetchDiskUsage = () => {
      invoke('get_disk_usage').then((res) => setDiskUsage(res as IDir.DiskUsage | null));
    };

    fetchDiskUsage();
    const interval = setInterval(fetchDiskUsage, POLL_INTERVAL);

    let unListen: () => void;
    listen('copy_done', () => fetchDiskUsage()).then((fn) => (unListen = fn));

    return () => {
      clearInterval(interval);
      if (unListen) unListen();
    };
  }, []);

  return diskUsage;
};

export { useDiskUsage };
