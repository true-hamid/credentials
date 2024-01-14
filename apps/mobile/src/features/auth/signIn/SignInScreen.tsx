import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Container, Form } from '@native-ui';
import { i18n } from '@localization';
import { Spacer } from 'packages/native-ui/src/atoms';
import { LoginFormFields } from '@types';
import { useSignInForm } from '@form-validations';

const SignInScreen = () => {
  const { control, errors, isValidForm, handleSubmit } = useSignInForm();

  const handleSignIn = (values: never) => {
    console.log('values', values);
    // Handle sign-in logic here
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
          <Button disabled={!isValidForm} mode="contained" onPress={handleSubmit(handleSignIn)} style={styles.button}>
            {i18n.t('signIn')}
          </Button>
          <Spacer size={'m'} />
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
