import { i18n } from '@localization';
import { Banner } from '@native-ui';
import { SemanticVariant } from '@types';
import { useApiErrorHandler } from '@network';

const APIErrorHandler = () => {
  const {showError, apiError} = useApiErrorHandler()


  return (
    showError && (
      <Banner
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
