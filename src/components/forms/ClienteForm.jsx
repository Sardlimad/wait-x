"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  Paper,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import QRScannerModal from '../common/QRScannerModal';
import SaveIcon from "@mui/icons-material/Save";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

const ClienteForm = ({ onSubmit, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    ci: "",
    nombre: "",
    apellidos: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQRScan = (data) => {
    if (data) {
      setFormData(prev => {
        const newData = {
          ...prev,
          ci: data.ci || prev.ci,
          nombre: data.nombre || prev.nombre,
          apellidos: data.apellidos || prev.apellidos
        };
        return newData;
      });
      setOpenModal(false);
    } else {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || "Error al guardar el cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 4,
        width: '100%',
        borderRadius: 2,
      }}
    >
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {isEditing ? 'Editar Cliente' : 'Registro de Cliente'}
            </Typography>
            <Box>
              <Tooltip title="Escanear QR">
                <IconButton 
                  color="primary" 
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  sx={{ mr: 1 }}
                >
                  <QrCodeScannerIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<KeyboardReturnIcon />}
                href="/"
                sx={{ mr: 1 }}
              >
                Regresar
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
            </Box>
          </Box>
          <Divider />
        </Grid>

        {/* Error Alert */}
        {error && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Grid>
        )}

        {/* Form Fields */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Carnet de Identidad"
            name="ci"
            value={formData.ci}
            onChange={handleChange}
            required
            disabled={isEditing}
            inputProps={{ 
              maxLength: 11,
              pattern: "[0-9]*",
              inputMode: "numeric"
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>

      {/* Modal QR Scanner */}
      <QRScannerModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onScan={handleQRScan}
      />
    </Paper>
  );
};

export default ClienteForm;
