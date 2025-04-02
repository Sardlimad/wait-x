"use client";
import React from 'react';
import { Box, Typography } from '@mui/material';
import LocalidadForm from '../../components/forms/LocalidadForm';

export default function LocalidadesPage() {
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/localidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la localidad');
      }

      // Aquí puedes agregar lógica de éxito (redirección, mensaje, etc.)
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Registro de Localidades
      </Typography>
      <LocalidadForm onSubmit={handleSubmit} />
    </Box>
  );
} 