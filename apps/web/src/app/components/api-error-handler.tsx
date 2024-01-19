import { i18n } from '@localization';
import { Alert } from '@web-ui';
import { SemanticVariant } from '@types';
import { useApiErrorHandler } from '@network';


const APIErrorHandler = () => {
  const {showError, apiError} = useApiErrorHandler()
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
