const ERROR_MAP = {
  INVALID_SIGN_IN_USERNAME: {
    code: 'SIGN_IN_ERR_001',
    message: 'Invalid Sign in Username',
  },
  INVALID_SIGN_IN_PASSWORD: {
    code: 'SIGN_IN_ERR_002',
    message: 'Invalid Sign in Password',
  },

  INVALID_SIGN_UP_USERNAME_EXIST: {
    code: 'SIGN_UP_ERR_001',
    message: 'Username already exists! User another one for sign up',
  },
};

export const ERROR_CODES = {
  INVALID_SIGN_IN_USERNAME: ERROR_MAP.INVALID_SIGN_IN_USERNAME.code,
  INVALID_SIGN_IN_PASSWORD: ERROR_MAP.INVALID_SIGN_IN_PASSWORD.code,
  INVALID_SIGN_UP_USERNAME_EXIST: ERROR_MAP.INVALID_SIGN_UP_USERNAME_EXIST.code,
};
