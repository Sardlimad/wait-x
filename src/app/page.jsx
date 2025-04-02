"use client";
import React, { useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          p: 3
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
          WaitX
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Sistema de Gestión de Lista de Espera
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Bienvenido a WaitX, la solución integral para la gestión de listas de espera en el transporte público.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push('/auth/login')}
          sx={{ mt: 2 }}
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Container>
  );
}
