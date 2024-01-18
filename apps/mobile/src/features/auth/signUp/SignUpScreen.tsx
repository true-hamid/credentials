import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  Button,
  Container,
  Form,
  TextInputAffix,
  Banner,
  Loader,
} from '@native-ui';
import { i18n } from '@localization';
import { Spacer } from 'packages/native-ui/src/atoms';
import { SemanticVariant, SignUpFormFields } from '@types';
import { useSignUpForm, useSignUpApi, countriesList } from '@features/auth';
import { getEncryptedValue } from '../_config/utils';
import { countryCodes } from '@utils';
import { tryToGetFCMToken } from '@utils/native';

const SignUpScreen = () => {
  const [selectedCountry, setSelectedCountry] = React.useState(undefined);
  const [fcmToken, setFcmToken] = React.useState(undefined);
  const { goBack } = useNavigation();
  const { control, errors, isValidForm, getValues } =
    useSignUpForm(selectedCountry);
  const { requestSignUp, data, loading } = useSignUpApi(getEncryptedValue);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        goBack();
      }, 2000);
    }
  }, [data]);

  useEffect(() => {
    if (fcmToken) {
      handleSignUp();
    }
  }, [fcmToken]);

  const setFCMTokenAfterPermission = async () => {
    setFcmToken(undefined);
    const token = await tryToGetFCMToken();
    setFcmToken(token);
  };

  const handleSignUp = () => {
    const values = getValues();
    const fcmTokenValue = fcmToken ? { pushNotificationId: fcmToken } : {};
    requestSignUp({
      username: values.signUpUsername,
      password: values.signUpPassword,
      country: values.country,
      phoneNumber: values.phoneNumber,
      name: values.name,
      ...fcmTokenValue,
    });
  };

  const getNotificationToken = () => {
    Alert.alert(
      i18n.t('signUpNotificationPermissionTitle'),
      i18n.t('signUpNotificationPermissionSubtitle'),
      [
        {
          text: i18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('ok'),
          onPress: setFCMTokenAfterPermission,
        },
      ]
    );
  };

  const handleSignIn = () => {
    goBack();
  };

  return (
    <Container
      header={
        <>
          <Banner
            visible={!!data}
            variant={SemanticVariant.SUCCESS}
            message={i18n.t([`accountCreatedSuccessfully`])}
          />
          <Loader visible={loading} />
          <Spacer size={'xl'} />
          <Text variant={'headlineMedium'}>{i18n.t('letsSetupAnAccount')}</Text>
        </>
      }
      footer={
        <>
          <Button
            disabled={!isValidForm || loading}
            mode="contained"
            loading={loading}
            onPress={getNotificationToken}
            style={styles.button}
          >
            {i18n.t('signUp')}
          </Button>
          <Spacer size={'m'} />
          <Button mode="text" onPress={handleSignIn} style={styles.button}>
            {i18n.t('signIn')}
          </Button>
        </>
      }
    >
      <>
        <Form.ControlledMenu
          name={SignUpFormFields.COUNTRY}
          control={control}
          anchorStyle={{ width: '50%', alignItems: 'flex-start' }}
          data={countriesList}
          onItemSelect={setSelectedCountry}
          clickableLabel={i18n.t('selectCountry')}
        />
        <Spacer size={'m'} />
        <Form.ControlledTextInput
          name={SignUpFormFields.NAME}
          control={control}
          // @ts-expect-error we are not in the type definition business
          errorMessage={errors?.[SignUpFormFields.NAME]?.message}
          label={i18n.t('name')}
          helperTextType={'error'}
        />
        <Spacer size={'m'} />
        <Form.ControlledTextInput
          name={SignUpFormFields.USERNAME}
          control={control}
          // @ts-expect-error we are not in the type definition business
          errorMessage={errors?.[SignUpFormFields.USERNAME]?.message}
          label={i18n.t('username')}
          helperTextType={'error'}
        />
        <Spacer size={'m'} />
        <Form.ControlledTextInput
          name={SignUpFormFields.PHONE_NUMBER}
          control={control}
          left={<TextInputAffix text={countryCodes[selectedCountry]} />}
          // @ts-expect-error we are not in the type definition business
          errorMessage={errors?.[SignUpFormFields.PHONE_NUMBER]?.message}
          label={i18n.t('phoneNumber')}
          helperTextType={'error'}
        />
        <Spacer size={'m'} />
        <Form.ControlledTextInput
          name={SignUpFormFields.PASSWORD}
          control={control}
          // @ts-expect-error we are not in the type definition business
          errorMessage={errors?.[SignUpFormFields.PASSWORD]?.message}
          label={i18n.t('password')}
          helperTextType={'error'}
          secureTextEntry
        />
        <Spacer size={'l'} />
      </>
    </Container>
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

export default SignUpScreen;
