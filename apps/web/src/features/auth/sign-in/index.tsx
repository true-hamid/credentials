import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Avatar,
  Box,
  LockOutlinedIcon,
  Button,
  Form,
  CircularProgress,
  Loader,
  AppBar,
  Toolbar,
  Paper,
  Grid,
  CssBaseline,
} from '@web-ui';
import { i18n } from '@localization';
import { useAppTheme } from '@theme';
import { SemanticVariant, SignInFormFields } from '@types';
import { useSignInApi, useSignInForm, useSignInData } from '@features/auth';
import { getEncrypted } from '../utils';
import { StorageKeys } from '@utils';
import { PostLoginPaths } from '../../../core/router/paths';
import { ChangeAppLanguage } from '../../../core/language';

export default function SignIn() {
  const theme = useAppTheme();
  const navigate = useNavigate();
  const { control, errors, isValidForm, getValues } = useSignInForm();
  const { requestSignIn, loading, data } = useSignInApi(getEncrypted);
  const { setDataOnSignIn } = useSignInData();

  useEffect(() => {
    if (data) {
      localStorage.setItem(StorageKeys.USER_COUNTRY, data.country);
      setDataOnSignIn(data);
      navigate(PostLoginPaths.PATH_DASHBOARD);
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
    <>
      <CssBaseline />
      <AppBar color="primary" position="relative">
        <Toolbar
          sx={{ flexDirection: 'row-revesrse', justifyContent: 'flex-end' }}
        >
          <ChangeAppLanguage />
        </Toolbar>
      </AppBar>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${theme.backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              marginTop: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h2" variant="h4">
              {i18n.t('welcomeTitles')}
            </Typography>
            <Typography component="h2" variant="h5">
              {i18n.t('signInToContinue')}
            </Typography>
            <Avatar sx={{ m: 3, bgcolor: theme.colors.primary }}>
              <LockOutlinedIcon />
            </Avatar>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Form.ControlledTextField
                name={SignInFormFields.USERNAME}
                control={control}
                // @ts-expect-error we are not in the type definition business
                errorMessage={errors?.[SignInFormFields.USERNAME]?.message}
                label={i18n.t('username')}
                value={'hamidab'}
                helperTextType={SemanticVariant.ERROR}
              />
              <Form.ControlledTextField
                name={SignInFormFields.PASSWORD}
                control={control}
                // @ts-expect-error we are not in the type definition business
                errorMessage={errors?.[SignInFormFields.PASSWORD]?.message}
                label={i18n.t('password')}
                helperTextType={SemanticVariant.ERROR}
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
              <Loader visible={loading} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
