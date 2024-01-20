import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Container,
  Loader,
  AvatarImage,
  CardTitle,
  Text,
} from '@native-ui';
import { i18n } from '@localization';
import { Spacer } from '@native-ui';
import { Endpoints, useAPIRequest } from '@network';
import { API_METHODS } from '@types';
import { useEffect } from 'react';
import { useGlobalStore } from '@global-store';
import { shadow } from '@utils/native';
import { useAppTheme } from '@theme';
import { useProfileApi } from '@features/dashboard';

const ProfileScreen = () => {
  const { clearSession } = useGlobalStore();
  const theme = useAppTheme();
  const { requestProfile, loading, data, cards } = useProfileApi(i18n);

  useEffect(() => {
    requestProfile();
  }, []);

  const onSignout = () => {
    clearSession();
  };

  return (
    <Container
      scrollable
      header={
        <AvatarImage
          style={{
            alignSelf: 'center',
          }}
          size={128}
          source={require('./user.png')}
        />
      }
      footer={
        <>
          <Spacer size={'l'} />
          <Button mode="contained" onPress={onSignout} style={styles.button}>
            {i18n.t('signOut')}
          </Button>
        </>
      }
    >
      <Spacer size="l" />
      <Text style={{ textAlign: 'center' }} variant={'headlineMedium'}>
        {data?.name || '-'}
      </Text>

      <Spacer size="xl" />
      <View
        //   @ts-expect-error we are not in the type definition business
        style={{
          ...shadow(3),
          backgroundColor: theme.colors.elevation.level2,
          padding: 16,
        }}
      >
        {cards.map((card) => (
          <React.Fragment key={card.id}>
            <Text variant={'titleLarge'}>{card?.title || '-'}</Text>
            <Text color="#000" variant={'headlineMedium'}>
              {card?.subtitle || '-'}
            </Text>
            <Spacer size="l" />
          </React.Fragment>
        ))}
      </View>
      <Loader visible={loading} />
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

export default ProfileScreen;
