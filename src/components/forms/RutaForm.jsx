"use client";
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  Autocomplete,
} from '@mui/material';

const RutaForm = ({ onSubmit, localidades, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    origen: null,
    destino: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Error al guardar la ruta');
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

        <TextField
          fullWidth
          label="Código de la Ruta"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          margin="normal"
          required
          disabled={isEditing}
        />

        <Autocomplete
          options={localidades}
          getOptionLabel={(option) => option.nombre}
          value={formData.origen}
          onChange={(_, newValue) => setFormData(prev => ({ ...prev, origen: newValue?.id }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Origen"
              required
              margin="normal"
            />
          )}
          sx={{ mb: 2 }}
        />

        <Autocomplete
          options={localidades}
          getOptionLabel={(option) => option.nombre}
          value={formData.destino}
          onChange={(_, newValue) => setFormData(prev => ({ ...prev, destino: newValue?.id }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Destino"
              required
              margin="normal"
            />
          )}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading || !formData.codigo || !formData.origen || !formData.destino}
        >
          {isEditing ? 'Actualizar Ruta' : 'Registrar Ruta'}
        </Button>
      </form>
    </Paper>
  );
};

export default RutaForm; 