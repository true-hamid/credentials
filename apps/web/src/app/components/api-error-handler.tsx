import { useCallback, useEffect } from 'react';
import { useGlobalStore } from '@global-store';
import { i18n } from '@localization';
import { Alert } from '@web-ui';
import { SemanticVariant } from '@types';
import { GlobalStateApiError } from 'packages/global-store/src/reducer';

const SKIP_ERROR_STATUS_CODES = [401];

const APIErrorHandler = () => {
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

  return (
    showError && (
      <Alert
        visible
        variant={SemanticVariant.ERROR}
        message={i18n.t([
          `apiErrors.${apiError?.errorCode}`,
          'apiErrors.GENERAL_ERROR',
        ])}
      />
    )
  );
};

export default APIErrorHandler;
