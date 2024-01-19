import { useEffect } from 'react';
import {
  AppBar,
  Avatar,
  Loader,
  Toolbar,
  Card,
  Box,
  Typography,
} from '@web-ui';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppTheme } from '@theme';
import { Endpoints, useAPIRequest } from '@network';
import { API_METHODS, USER_COUNTRY } from '@types';
import { i18n } from '@localization';
import { countryCodes } from '@utils';
import { useGlobalStore } from '@global-store';
import { ChangeAppLanguage } from '../../../core/language';
import { IconButton } from '@mui/material';

export function Profile() {
  const theme = useAppTheme();
  const { clearSession } = useGlobalStore();
  const { request, loading, error, data } = useAPIRequest<{
    name: string;
    username: string;
    phoneNumber: string;
    country: string;
  }>({
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

  const cards = [
    {
      id: 1,
      title: i18n.t('username') || '-',
      subtitle: data?.username || '-',
    },
    {
      id: 2,
      title: i18n.t('phoneNumber') || '-',
      subtitle:
        (countryCodes?.[data?.country as USER_COUNTRY] || '') +
          data?.phoneNumber || '-',
    },
    {
      id: 3,
      title: i18n.t('country') || '-',
      subtitle: data?.country ? i18n.t('country' + data?.country) : '' || '-',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <AppBar color="default" position="relative">
        <Toolbar
          sx={{ flexDirection: 'row-revesrse', justifyContent: 'flex-end' }}
        >
          <ChangeAppLanguage />
          <IconButton sx={{ mx: 2 }} id="basic-button" onClick={onSignout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Avatar
                alt="User"
                src="/assets/user.png"
                sx={{
                  width: 256,
                  height: 256,
                  bgcolor: theme.colors.surface,
                }}
              />
            </Box>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ mt: 3 }}
            >
              {data?.name || '-'}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card.Title title={card.title} subtitle={card.subtitle} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Loader visible={false} />
    </Box>
  );
}
