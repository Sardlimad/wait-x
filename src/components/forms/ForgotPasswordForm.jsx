"use client";
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  InputAdornment,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Aquí irá la lógica de recuperación de contraseña
      console.log('Recovery email:', email);
      setSuccess(true);
    } catch (err) {
      setError('Error al procesar la solicitud. Por favor, intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          Si el correo electrónico existe en nuestra base de datos, recibirás las instrucciones para restablecer tu contraseña.
        </Alert>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
        </Typography>
      )}

      <TextField
        fullWidth
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        disabled={success}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 3, mb: 2 }}
        disabled={success}
      >
        Enviar instrucciones
      </Button>

      <Box sx={{ textAlign: 'center' }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => router.push('/auth/login')}
          sx={{ 
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main',
            }
          }}
        >
          Volver al inicio de sesión
        </Link>
      </Box>
    </form>
  );
};

export default ForgotPasswordForm; 