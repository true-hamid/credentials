import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
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
import { LoginFormFields } from '@types';
import { useSignInApi, useSignInForm, useSignInData } from '@features/auth';

export default function SignIn() {
  const theme = useAppTheme();
  const navigate = useNavigate();
  const { control, errors, isValidForm, getValues } = useSignInForm();
  const { requestSignIn, loading, data } = useSignInApi();
  const { setDataOnSignIn } = useSignInData();

  useEffect(() => {
    if (data) {
      setDataOnSignIn(data);
    }
  }, [data]);

  const onSignUpClick = () => {
    navigate('/signup');
  };

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
        <Typography component="h2" variant="h4">
          {i18n.t('welcomeTitles')}
        </Typography>
        <Typography component="h2" variant="h5">
          {i18n.t('signInToContinue')}
        </Typography>
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
              name={LoginFormFields.USERNAME}
              control={control}
              // @ts-expect-error we are not in the type definition business
              errorMessage={errors?.[LoginFormFields.USERNAME]?.message}
              label={i18n.t('username')}
              value={'hamidab'}
              helperTextType={'error'}
            />
            <ControlledTextField
              name={LoginFormFields.PASSWORD}
              control={control}
              // @ts-expect-error we are not in the type definition business
              errorMessage={errors?.[LoginFormFields.PASSWORD]?.message}
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
                {i18n.t('signIn')}
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
            <Button onClick={onSignUpClick} variant="outlined" fullWidth>
              {i18n.t('signUp')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
