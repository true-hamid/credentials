import { MMKV } from 'react-native-mmkv';

export const MMKVstorage = new MMKV();

export const Storage = {
  saveToStorageValue: (key: string, value: string | boolean | number) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    try {
      MMKVstorage.set(key, value);
    } catch (error) {
      console.warn(error);
    }
  },
  getString: (key: string) => {
    let result = MMKVstorage.getString(key);
    try {
      result = JSON.parse(result);
    } catch (e) {
      console.log(e);
    }
    return result;
  },
  getNumber: (key: string) => {
    return MMKVstorage.getNumber(key);
  },
  getBoolean: (key: string) => {
    return MMKVstorage.getBoolean(key);
  },
  delete: (key: string) => {
    MMKVstorage.delete(key);
  },
  deleteAll: () => {
    MMKVstorage.clearAll();
  },
};
