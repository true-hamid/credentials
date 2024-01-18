import { useEffect } from 'react';
import { useGlobalStore } from '@global-store';
import { i18n } from '@localization';
import { Alert } from '@web-ui';
import { SemanticVariant } from '@types';

const APIErrorHandler = () => {
  const VISIBILITY_TIMEOUT = 5000;
  const { apiError, clearApiError } = useGlobalStore();

  useEffect(() => {
    if (apiError?.errorCode) {
      setTimeout(() => {
        clearApiError();
      }, VISIBILITY_TIMEOUT);
    }
  }, [apiError?.errorCode]);

  return (
    apiError?.errorCode && (
      <Alert
        visible
        variant={SemanticVariant.ERROR}
        message={i18n.t([
          `apiErrors.${apiError.errorCode}`,
          'apiErrors.GENERAL_ERROR',
        ])}
      />
    )
  );
};

export default APIErrorHandler;
