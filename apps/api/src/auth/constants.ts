const ERROR_MAP = {
  INVALID_SIGN_IN_USERNAME: {
    code: 'SIGN_IN_ERR_001',
    message: 'Invalid Sign in Username',
  },
  INVALID_SIGN_IN_PASSWORD: {
    code: 'SIGN_IN_ERR_002',
    message: 'Invalid Sign in Password',
  },
};

export const ERROR_CODES = {
  INVALID_SIGN_IN_USERNAME: ERROR_MAP.INVALID_SIGN_IN_USERNAME.code,
  INVALID_SIGN_IN_PASSWORD: ERROR_MAP.INVALID_SIGN_IN_PASSWORD.code,
};
