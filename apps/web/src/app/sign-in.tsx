import React, { useState, useEffect } from 'react';
import JSEncrypt from 'jsencrypt';
// import * as crypto from 'crypto';
import axios from 'axios';

const SignIn = () => {
  const [username, setUsername] = useState('hamidab');
  const [password, setPassword] = useState('Mash123$');
  const [apiParams, setAPIParams] = useState<{
    pbk: string;
    randomId: string;
  }>({ pbk: '', randomId: '' });

  // useEffect(() => {
  //   if (!apiParams.pbk) {
  //     axios
  //       .get('/api/auth/params')
  //       .then((response) => setAPIParams(response.data));
  //   }
  // }, [apiParams.pbk]);

  useEffect(() => {
    if (apiParams.pbk) {
      login();
    }
  }, [apiParams?.pbk]);

  const getParams = async () => {
    const params = await axios.get('/api/auth');
    setAPIParams(params.data);
  };

  const login = async () => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(apiParams.pbk);
    const encryptedPassword = encrypt.encrypt(password);

    axios
      .post('api/auth/signIn', {
        username: username,
        password: encryptedPassword,
        randomId: apiParams.randomId,
        publicKey: apiParams.pbk,
      })
      .then((response) => {
        // Handle the response
        // For example, you can store the JWT token in localStorage
        localStorage.setItem('token', response.data.token);
      });
  };

  const getProfile = () => {
    axios
      .get('api/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        // Handle the response
        // For example, you can store the JWT token in localStorage
        console.log(response.data);
      });
  };

  return (
    <div>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={getParams}>Submit</button>
      <button onClick={getProfile}>Get Profile</button>
    </div>
  );
};

export default SignIn;
