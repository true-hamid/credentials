import { RSA } from 'react-native-rsa-native';

export const getEncryptedValue = async (value: string, publicKey: string) => {
  return await RSA.encrypt(value, publicKey);
};
