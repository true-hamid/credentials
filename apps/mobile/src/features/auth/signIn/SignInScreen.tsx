import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, Container, Form } from '@native-ui';
import { i18n } from '@localization';
import { Spacer } from 'packages/native-ui/src/atoms';
import { SignInFormFields } from '@types';
import { useSignInForm, useSignInData, useSignInApi } from '@features/auth';
import { getEncryptedValue } from '../_config/utils';
import { Routes } from '../_config/nav/routes';

const SignInScreen = () => {
  const { control, errors, isValidForm, handleSubmit } = useSignInForm();
  const { requestSignIn, data, loading } = useSignInApi(getEncryptedValue);
  const { setDataOnSignIn } = useSignInData();
  const { navigate }: {navigate: (route: string) => void} = useNavigation();

  useEffect(() => {
    if (data?.token) {
      setDataOnSignIn({ token: data.token });
    }
  }, [data?.token]);

  const handleSignIn = (values: { username: string; password: string }) => {
    requestSignIn({ username: values.username, password: values.password });
  };

  const handleSignUp = () => {
    navigate(Routes.ROUTE_SIGN_UP)
  };

  return (
    <Container
      header={
        <>
          <Spacer size={'xl'} />
          <Text variant={'headlineMedium'}>{i18n.t('welcomeTitles')}</Text>
          <Text variant={'headlineMedium'}>{i18n.t('signInToContinue')}</Text>
        </>
      }
      footer={
        <>
          <Form.ControlledTextInput
            name={SignInFormFields.USERNAME}
            control={control}
            // @ts-expect-error we are not in the type definition business
            errorMessage={errors?.[SignInFormFields.USERNAME]?.message}
            label={i18n.t('username')}
            helperTextType={'error'}
          />
          <Spacer size={'m'} />
          <Form.ControlledTextInput
            name={SignInFormFields.PASSWORD}
            control={control}
            // @ts-expect-error we are not in the type definition business
            errorMessage={errors?.[SignInFormFields.PASSWORD]?.message}
            label={i18n.t('password')}
            helperTextType={'error'}
            secureTextEntry
          />
          <Spacer size={'l'} />
          <Button
            disabled={!isValidForm || loading}
            mode="contained"
            loading={loading}
            onPress={handleSubmit(handleSignIn)}
            style={styles.button}
          >
            {i18n.t('signIn')}
          </Button>
          <Spacer size={'m'} />
          <Button mode="outlined" onPress={handleSignUp} style={styles.button}>
            {i18n.t('signUp')}
          </Button>
          <Spacer size={'xl'} />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: 16,
  },
});

export default SignInScreen;
