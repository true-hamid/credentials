import { useCallback, useEffect } from 'react';
import { useGlobalStore } from '@global-store';

const SKIP_ERROR_STATUS_CODES = [401];

export const useApiErrorHandler = () => {
  const VISIBILITY_TIMEOUT = 5000;
  const { apiError, clearApiError } = useGlobalStore();

  const showApiError = useCallback(() => {
    const { errorCode, statusCode = 0 } = apiError || {
      errorCode: '',
      statusCode: 0,
    };
    if (errorCode && !SKIP_ERROR_STATUS_CODES.includes(statusCode as number)) {
      return true;
    } else {
      return false;
    }
  }, [apiError]);

  const showError = showApiError();

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        clearApiError();
      }, VISIBILITY_TIMEOUT);
    }
  }, [showError]);
  return {
    showError,
    apiError,
  };
};
