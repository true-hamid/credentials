import React from 'react';
import {
  Typography,
  Avatar,
  Box,
  Container,
  LockOutlinedIcon,
  Button,
  ControlledTextField,
} from '@web-ui';
import { i18n } from '@localization';
import { useAppTheme } from '@theme';
import { useSignInForm } from '@form-validations';
import { LoginFormFields } from '@types';

export default function SignIn() {
  const theme = useAppTheme();
  const { control, errors, isValidForm, getValues } = useSignInForm();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(getValues());
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Typography component="h2" variant="h4">
          {i18n.t('welcomeTitles')}
        </Typography>
        <Typography component="h2" variant="h5">
          {i18n.t('signInToContinue')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: theme.colors.primary }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <ControlledTextField
              name={LoginFormFields.USERNAME}
              control={control}
              // @ts-expect-error we are not in the type definition business
              errorMessage={errors?.[LoginFormFields.USERNAME]?.message}
              label={i18n.t('username')}
              helperTextType={'error'}
            />
            <ControlledTextField
              name={LoginFormFields.PASSWORD}
              control={control}
              // @ts-expect-error we are not in the type definition business
              errorMessage={errors?.[LoginFormFields.PASSWORD]?.message}
              label={i18n.t('username')}
              helperTextType={'error'}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            <Button
              disabled={!isValidForm}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {i18n.t('signIn')}
            </Button>
            <Button href="#" variant="outlined" fullWidth>
              {i18n.t('signUp')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

// import React, { useState, useEffect } from 'react';
// import JSEncrypt from 'jsencrypt';
// // import * as crypto from 'crypto';
// import axios from 'axios';

// const SignIn = () => {
//   const [username, setUsername] = useState('hamidab');
//   const [password, setPassword] = useState('Mash123$');
//   const [apiParams, setAPIParams] = useState<{
//     pbk: string;
//     randomId: string;
//   }>({ pbk: '', randomId: '' });

//   // useEffect(() => {
//   //   if (!apiParams.pbk) {
//   //     axios
//   //       .get('/api/auth/params')
//   //       .then((response) => setAPIParams(response.data));
//   //   }
//   // }, [apiParams.pbk]);

//   useEffect(() => {
//     if (apiParams.pbk) {
//       login();
//     }
//   }, [apiParams?.pbk]);

//   const getParams = async () => {
//     const params = await axios.get('/api/auth');
//     setAPIParams(params.data);
//   };

//   const login = async () => {
//     const encrypt = new JSEncrypt();
//     encrypt.setPublicKey(apiParams.pbk);
//     const encryptedPassword = encrypt.encrypt(password);

//     axios
//       .post('api/auth/signIn', {
//         username: username,
//         password: encryptedPassword,
//         randomId: apiParams.randomId,
//         publicKey: apiParams.pbk,
//       })
//       .then((response) => {
//         // Handle the response
//         // For example, you can store the JWT token in localStorage
//         localStorage.setItem('token', response.data.token);
//       });
//   };

//   const getProfile = () => {
//     axios
//       .get('api/auth/profile', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       })
//       .then((response) => {
//         // Handle the response
//         // For example, you can store the JWT token in localStorage
//         console.log(response.data);
//       });
//   };

//   return (
//     <div>
//       <input
//         placeholder="username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         placeholder="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={getParams}>Submit</button>
//       <button onClick={getProfile}>Get Profile</button>
//     </div>
//   );
// };

// export default SignIn;
