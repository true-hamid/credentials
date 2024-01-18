import { StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Loader,
  AvatarImage,
  CardTitle,
} from '@native-ui';
import { i18n } from '@localization';
import { Spacer } from '@native-ui';
import { Endpoints, useAPIRequest } from '@network';
import { API_METHODS } from '@types';
import { useEffect } from 'react';
import { useGlobalStore } from '@global-store';

const ProfileScreen = () => {
  const { clearSession } = useGlobalStore();
  const { request, loading, error, data } = useAPIRequest<unknown>({
    url: Endpoints.PROFILE,
    method: API_METHODS.GET,
  });

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    console.log('loading', loading);
    console.log('error', error);
    console.log('data', data);
  }, [loading, error, data]);

  const onSignout = () => {
    clearSession();
  };


  return (
    <Container
      footer={
        <>
          <Spacer size={'l'} />
          <Button mode="contained" onPress={onSignout} style={styles.button}>
            {i18n.t('signOut')}
          </Button>
        </>
      }
    >
      <AvatarImage
        style={{
          alignSelf: 'center',
        }}
        size={128}
        source={require('./user.png')}
      />
      <CardTitle
    //   mode
        theme={{ colors: { elevation: { level1: '#000' } } }}
        title="Card Title"
        subtitle="Card Subtitle"
        // left={(props) => <Avatar.Icon {...props} icon="folder" />}
        // right={(props) => (
        //   <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
        // )}
      />
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
