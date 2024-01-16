import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {RSA} from 'react-native-rsa-native';
import { Text, Button, Container, Form } from '@native-ui';
import { i18n } from '@localization';
import { Spacer } from 'packages/native-ui/src/atoms';
import { LoginFormFields } from '@types';
import { useSignInForm, useSignInData, useSignInApi } from '@features/auth';

const getEncryptedValue = async (value: string, publicKey: string) => {
  return await RSA.encrypt(value, publicKey);
};

const SignInScreen = () => {
  const { control, errors, isValidForm, handleSubmit } = useSignInForm();
  const { requestSignIn, data, loading } = useSignInApi(getEncryptedValue);
  const { setDataOnSignIn } = useSignInData();

  useEffect(() => {
    if (data?.token) {
      setDataOnSignIn({ token: data.token });
    }
  }, [data?.token]);

  const handleSignIn = (values: { username: string; password: string }) => {
    // Handle sign-in logic here
    requestSignIn({ username: values.username, password: values.password });
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
            name={LoginFormFields.USERNAME}
            control={control}
            // @ts-expect-error we are not in the type definition business
            errorMessage={errors?.[LoginFormFields.USERNAME]?.message}
            label={i18n.t('username')}
            helperTextType={'error'}
          />
          <Spacer size={'m'} />
          <Form.ControlledTextInput
            name={LoginFormFields.PASSWORD}
            control={control}
            // @ts-expect-error we are not in the type definition business
            errorMessage={errors?.[LoginFormFields.PASSWORD]?.message}
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
          {/* @ts-expect-error we are not in the type definition business */}
          <Button mode="outlined" onPress={handleSignIn} style={styles.button}>
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
