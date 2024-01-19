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
import { useGlobalStore } from '@global-store';
import { IconButton } from '@mui/material';
import { useProfileApi } from '@features/dashboard';
import { i18n } from '@localization';

export function Profile() {
  const theme = useAppTheme();
  const { clearSession } = useGlobalStore();
  const { requestProfile, loading, data, cards } = useProfileApi(i18n);

  useEffect(() => {
    requestProfile();
  }, []);

  const onSignout = () => {
    clearSession();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <AppBar color="primary" position="relative">
        <Toolbar
          sx={{ flexDirection: 'row-revesrse', justifyContent: 'flex-end' }}
        >
          <IconButton sx={{ mx: 2 }} id="basic-button" onClick={onSignout}>
            <LogoutIcon style={{color: 'white'}} />
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
            {cards.map((card: {id: number, title: string, subtitle: string}) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card.Title title={card.title} subtitle={card.subtitle} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Loader visible={loading} />
    </Box>
  );
}
