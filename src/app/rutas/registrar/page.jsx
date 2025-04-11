"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import RutaForm from '../../../components/forms/RutaForm';
import { API_URL } from '../../../config/settings';

export default function RutasPage() {
  const [localidades, setLocalidades] = useState([]);

  useEffect(() => {
    const fetchLocalidades = async () => {
      try {
        const endpoint = API_URL+'/api/localidades';
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setLocalidades(data);
        }
      } catch (error) {
        console.error('Error al cargar localidades:', error);
      }
    };

    fetchLocalidades();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/rutas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la ruta');
      }

      // Aquí puedes agregar lógica de éxito (redirección, mensaje, etc.)
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <RutaForm onSubmit={handleSubmit} localidades={localidades} />
    </Box>
  );
}