import { useContext, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import NetworkContext from './NetworkContext';
import { useGlobalStore } from '@global-store';

type FixedHeaders = {
  authorization?: string;
  channel?: string;
};

const TIMEOUT = 10000;
export const useAPIRequest = <Data>(defaultConfig?: AxiosRequestConfig) => {
  const { setApiError, session } = useGlobalStore();
  const { baseURL, channel } = useContext(NetworkContext);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const AxiosInstance = axios.create({
    baseURL,
    timeout: TIMEOUT,
  });

  const fixedHeaders: FixedHeaders = {};
  fixedHeaders['channel'] = channel;
  if (session?.authToken) {
    fixedHeaders['authorization'] = `Bearer ${session.authToken}`;
  }

  AxiosInstance.defaults.headers.common = fixedHeaders;

  const request = (requestConfig?: AxiosRequestConfig): void => {
    setData(null);
    setError(null);
    setLoading(true);
    AxiosInstance.request({ ...defaultConfig, ...requestConfig })
      .then((response: AxiosResponse<Data>) => {
        console.log('REQ_response', response);
        setData(response.data);
      })
      .catch((error) => {
        console.log('REQ_error', error);
        setError(error);
        setApiError({
          errorCode: error?.response?.data?.message || 'GENERAL_ERROR',
        });
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
