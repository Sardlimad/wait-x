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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

const SalidaForm = ({ onSubmit, rutas, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    ruta: null,
    fecha_hora: new Date(),
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        fecha_hora: new Date(initialData.fecha_hora),
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Error al guardar la salida');
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

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DateTimePicker
            label="Fecha y Hora de Salida"
            value={formData.fecha_hora}
            onChange={(newValue) => setFormData(prev => ({ ...prev, fecha_hora: newValue }))}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                required: true,
              },
            }}
            sx={{ mb: 3 }}
          />
        </LocalizationProvider>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading || !formData.ruta || !formData.fecha_hora}
        >
          {isEditing ? 'Actualizar Salida' : 'Registrar Salida'}
        </Button>
      </form>
    </Paper>
  );
};

export default SalidaForm; 