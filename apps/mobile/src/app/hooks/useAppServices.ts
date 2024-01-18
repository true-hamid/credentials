import { useGlobalStore } from '@global-store';
import { StorageKeys } from '@utils';
import { useEffect } from 'react';
import { saveToStorageValue } from '../../core/storage';

export const useAppServices = () => {
  const { session } = useGlobalStore();

  useEffect(() => {
    saveToStorageValue(StorageKeys.USER_COUNTRY, session.country);
  }, [session.country]);
};
