"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
// import SalidaForm from '../../components/forms/SalidaForm';

export default function SalidasPage() {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch('/api/rutas');
        if (response.ok) {
          const data = await response.json();
          setRutas(data);
        }
      } catch (error) {
        console.error('Error al cargar rutas:', error);
      }
    };

    fetchRutas();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/salidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la salida');
      }

      // Aquí puedes agregar lógica de éxito (redirección, mensaje, etc.)
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Registro de Salidas
      </Typography>
      {/* <SalidaForm onSubmit={handleSubmit} rutas={rutas} /> */}
    </Box>
  );
} 