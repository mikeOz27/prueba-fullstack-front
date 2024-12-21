import React, { useState } from 'react';
import api from '../api/axios';
import PropTypes from 'prop-types';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  Button,
  Box,
} from '@mui/material';

const Login = ({ setToken, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('login', { email, password });
      console.log('response', response);
      if (response.data.status.code === 400) {
        console.log('Error al iniciar sesión', response.data);
        localStorage.removeItem('token'); // Limpiar el token en caso de error
        localStorage.removeItem('userAuth'); // Limpiar el usuario autenticado en caso de error
        setErrorMessage('Error al iniciar sesión. Verifique sus credenciales.');
        return;
      }

      const token = response.data.status.token;
      const userAuth = response.data.status.user;

      localStorage.setItem('token', token);
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
      setToken(token);
      setUser(userAuth);
      setErrorMessage(''); // Limpiar el mensaje de error en caso de éxito
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      localStorage.removeItem('token'); // Limpiar el token en caso de error
      localStorage.removeItem('userAuth'); // Limpiar el usuario autenticado en caso de error

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error al iniciar sesión. Verifique sus credenciales.');
      }
    }
  };

  return (
    <Container
      fluid
      className="p-4"
      sx={{
        background:
          'radial-gradient(circle, rgba(218, 81%, 95%) 0%, rgba(218, 81%, 75%) 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ padding: 5 }}>
          <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Iniciar Sesión
          </Typography>

          {errorMessage && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ marginBottom: 3 }}
            >
              {errorMessage}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ marginBottom: 3 }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ marginBottom: 3 }}
            />
            <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
              <Checkbox name="remember" id="rememberMe" />
              <Typography variant="body2">Remember me</Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ padding: '10px' }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login;
