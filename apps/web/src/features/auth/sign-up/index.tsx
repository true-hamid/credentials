import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Container,
  LockOutlinedIcon,
  Button,
  ControlledTextField,
  CircularProgress,
} from '@web-ui';
import { i18n } from '@localization';
import { useAppTheme } from '@theme';
import { SignInFormFields } from '@types';
import { useSignInApi, useSignInForm, useSignInData } from '@features/auth';
import { getEncrypted } from '../utils';

export default function SignUp() {
  const theme = useAppTheme();
  const navigate = useNavigate();
  const { control, errors, isValidForm, getValues } = useSignInForm();
  const { requestSignIn, loading, data } = useSignInApi(getEncrypted);
  const { setDataOnSignIn } = useSignInData();

  useEffect(() => {
    if (data) {
      setDataOnSignIn(data);
    }
  }, [data]);

  const onSignInClick = () => {
    navigate("/signin");
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    requestSignIn({
      username: getValues().username,
      password: getValues().password,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: theme.colors.primary }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <ControlledTextField
              name={SignInFormFields.USERNAME}
              control={control}
              // @ts-expect-error we are not in the type definition business
              errorMessage={errors?.[SignInFormFields.USERNAME]?.message}
              label={i18n.t('username')}
              value={'hamidab'}
              helperTextType={'error'}
            />
            <ControlledTextField
              name={SignInFormFields.PASSWORD}
              control={control}
              // @ts-expect-error we are not in the type definition business
              errorMessage={errors?.[SignInFormFields.PASSWORD]?.message}
              label={i18n.t('password')}
              helperTextType={'error'}
              type="password"
              value={'Mash123$'}
              autoComplete="current-password"
              margin="normal"
            />
            <Box sx={{ position: 'relative' }}>
              <Button
                disabled={!isValidForm}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {i18n.t('signUp')}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>

            <Button onClick={onSignInClick} variant="outlined" fullWidth>
              {i18n.t('signIn')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
