"use client";
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Autocomplete } from '@mui/material';
import ClienteForm from './ClienteForm';

const InscripcionForm = ({ onSubmit, rutas }) => {
  const [formData, setFormData] = useState({
    ruta: null,
    cliente: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clienteData, setClienteData] = useState(null);
  const [searchingCliente, setSearchingCliente] = useState(false);

  const handleClienteSearch = async (ci) => {
    setSearchingCliente(true);
    try {
      // Aquí irá la llamada a la API para buscar el cliente
      const response = await fetch(`/api/clientes/${ci}`);
      if (response.ok) {
        const data = await response.json();
        setClienteData(data);
        setFormData(prev => ({ ...prev, cliente: data.id }));
      } else {
        setClienteData(null);
      }
    } catch (err) {
      setError('Error al buscar el cliente');
    } finally {
      setSearchingCliente(false);
    }
  };

  const handleClienteSubmit = async (clienteData) => {
    try {
      // Aquí irá la llamada a la API para crear el cliente
      const response = await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData),
      });
      
      if (!response.ok) throw new Error('Error al crear el cliente');
      
      const newCliente = await response.json();
      setClienteData(newCliente);
      setFormData(prev => ({ ...prev, cliente: newCliente.id }));
    } catch (err) {
      setError('Error al crear el cliente');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Error al crear la inscripción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Autocomplete
          options={rutas}
          getOptionLabel={(option) => `${option.codigo}: ${option.origen} -> ${option.destino}`}
          value={formData.ruta}
          onChange={(_, newValue) => setFormData(prev => ({ ...prev, ruta: newValue?.id }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ruta"
              required
              margin="normal"
            />
          )}
          sx={{ mb: 3 }}
        />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Datos del Cliente
        </Typography>

        <TextField
          fullWidth
          label="Carnet de Identidad"
          onChange={(e) => handleClienteSearch(e.target.value)}
          margin="normal"
          required
          disabled={searchingCliente}
          InputProps={{
            endAdornment: searchingCliente ? <CircularProgress size={20} /> : null,
          }}
        />

        {clienteData ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Cliente encontrado: {clienteData.nombre} {clienteData.apellidos}
            </Typography>
            <Button
              variant="text"
              onClick={() => setClienteData(null)}
              sx={{ mt: 1 }}
            >
              Cambiar Cliente
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Cliente no encontrado. Por favor, complete los datos para registrarlo.
            </Typography>
            <ClienteForm onSubmit={handleClienteSubmit} />
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading || !formData.ruta || !formData.cliente}
        >
          {loading ? 'Registrando...' : 'Registrar Inscripción'}
        </Button>
      </form>
    </Paper>
  );
};

export default InscripcionForm; 