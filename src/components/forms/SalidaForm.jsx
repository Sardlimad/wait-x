"use client";
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  Autocomplete,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SaveIcon from "@mui/icons-material/Save";

const SalidaForm = ({ onSubmit, rutas, initialData = null, isEditing = false }) => {
  const router = useRouter();
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
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {isEditing ? 'Editar Salida' : 'Registro de Salida'}
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<KeyboardReturnIcon />}
                onClick={() => router.back()}
                sx={{ mr: 1 }}
              >
                Regresar
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                disabled={loading || !formData.ruta || !formData.fecha_hora}
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />
        </Grid>

        <Grid item xs={12}>
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
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SalidaForm; 