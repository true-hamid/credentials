import { useContext, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import NetworkContext from './NetworkContext';

type FixedHeaders = {
  authorization?: string;
};

const TIMEOUT = 10000;
export const useAPIRequest = <Data>(defaultConfig?: AxiosRequestConfig) => {
  const { baseURL, authorization } = useContext(NetworkContext);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const AxiosInstance = axios.create({
    baseURL,
    timeout: TIMEOUT,
  });

  const fixedHeaders: FixedHeaders = {};
  if (authorization) {
    fixedHeaders['authorization'] = authorization;
  }

  const request = (requestConfig?: AxiosRequestConfig): void => {
    setLoading(true);
    AxiosInstance.request({ ...defaultConfig, ...requestConfig })
      .then((response: AxiosResponse<Data>) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    request,
    data,
    error,
    loading,
  };
};
