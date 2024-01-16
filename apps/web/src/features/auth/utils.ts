import JSEncrypt from 'jsencrypt';

export const getEncrypted = (value: string, publicKey: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(value);
};
