import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Container,
  LockOutlinedIcon,
  Button,
  Form,
  CircularProgress,
  InputAdornment,
  Loader,
  Alert,
} from '@web-ui';
import { i18n } from '@localization';
import { useAppTheme } from '@theme';
import { SemanticVariant, SignUpFormFields, USER_COUNTRY } from '@types';
import { useSignUpForm, useSignUpApi, countriesList } from '@features/auth';
import { getEncrypted } from '../utils';
import { countryCodes } from '@utils';

export default function SignUp() {
  const theme = useAppTheme();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = React.useState<
    USER_COUNTRY | undefined
  >(undefined);
  const { control, errors, isValidForm, getValues } =
    useSignUpForm(selectedCountry);
  const { requestSignUp, data, loading } = useSignUpApi(getEncrypted);
  const countries = countriesList(i18n);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    }
  }, [data]);

  const onSignInClick = () => {
    navigate('/signin');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    requestSignUp({
      username: getValues().signUpUsername,
      password: getValues().signUpPassword,
      country: getValues().country,
      phoneNumber: getValues().phoneNumber,
      name: getValues().name,
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
          <Alert
            visible={!!data}
            variant={SemanticVariant.SUCCESS}
            message={i18n.t([`accountCreatedSuccessfully`])}
          />
          <Avatar sx={{ m: 3, bgcolor: theme.colors.primary }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Form.ControlledMenu
              name={SignUpFormFields.COUNTRY}
              control={control}
              data={countries}
              onItemSelect={(value: string) =>
                setSelectedCountry(value as USER_COUNTRY)
              }
              clickableLabel={i18n.t('selectCountry')}
            />
            <Form.ControlledTextField
              name={SignUpFormFields.NAME}
              control={control}
              // @ts-expect-error we are not in the type definition business
              errorMessage={errors?.[SignUpFormFields.NAME]?.message}
              label={i18n.t('name')}
              helperTextType={'error'}
              margin="normal"
            />
            <Form.ControlledTextField
              name={SignUpFormFields.USERNAME}
              control={control}
              // @ts-expect-error we are not in the type definition business
              errorMessage={errors?.[SignUpFormFields.USERNAME]?.message}
              label={i18n.t('username')}
              helperTextType={'error'}
              margin="normal"
            />
            <Form.ControlledTextField
              name={SignUpFormFields.PHONE_NUMBER}
              control={control}
              // @ts-expect-error we are not in the type definition business
              errorMessage={errors?.[SignUpFormFields.PHONE_NUMBER]?.message}
              label={i18n.t('phoneNumber')}
              helperTextType={'error'}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {selectedCountry ? countryCodes[selectedCountry] : ''}
                  </InputAdornment>
                ),
              }}
            />
            <Form.ControlledTextField
              name={SignUpFormFields.PASSWORD}
              control={control}
              // @ts-expect-error we are not in the type definition business
              errorMessage={errors?.[SignUpFormFields.PASSWORD]?.message}
              label={i18n.t('password')}
              helperTextType={'error'}
              type="password"
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

            <Button onClick={onSignInClick} variant="text" fullWidth>
              {i18n.t('signIn')}
            </Button>
            <Loader visible={loading} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
