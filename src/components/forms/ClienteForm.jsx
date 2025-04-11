"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { clientValidation } from "../../helpers/ValidationSchema";
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
import QRScannerModal from "../common/QRScannerModal";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useRouter } from "next/navigation";
import { useLoading } from "../../app/layout";
const ClienteForm = ({ onSubmit, initialData = null, isEditing = false }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      ci: "",
      nombre: "",
      apellidos: "",
    },
    validationSchema: clientValidation,
    onSubmit: async (values) => {
      setError("");
      setLoading(true);
      try {
        await onSubmit(values);
      } catch (err) {
        setError(err.message || "Error al guardar el cliente");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (initialData) {
      formik.setValues(initialData);
    }
  }, [initialData]);
  

  const handleQRScan = (data) => {
    if (data) {
      formik.setValues({
        ci: data.ci || formik.values.ci,
        nombre: data.nombre || formik.values.nombre,
        apellidos: data.apellidos || formik.values.apellidos,
      });
      setOpenModal(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Editar Cliente" : "Registro de Cliente"}
              </Typography>
              <Box>
                <Tooltip title="Escanear QR">
                  <IconButton color="primary" onClick={() => setOpenModal(true)} sx={{ mr: 1 }}>
                    <QrCodeScannerIcon />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  color={loading || !formik.isValid ? "disabled" : "primary"}
                  startIcon={<SaveIcon />}
                  type="submit"
                  disabled={loading || !formik.isValid}
                  sx={{ mr: 1 }}
                >
                  {loading ? "Guardando..." : "Guardar"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<KeyboardReturnIcon />}
                  onClick={() => router.back()}
                >
                  Regresar
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
              value={formik.values.ci}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.ci && Boolean(formik.errors.ci)}
              helperText={formik.touched.ci && formik.errors.ci}
              required
              disabled={isEditing}
              inputProps={{
                maxLength: 11,
                pattern: "[0-9]*",
                inputMode: "numeric",
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Apellidos"
              name="apellidos"
              value={formik.values.apellidos}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
              helperText={formik.touched.apellidos && formik.errors.apellidos}
              required
            />
          </Grid>
        </Grid>
      </form>

      {/* Modal QR Scanner */}
      <QRScannerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onScan={handleQRScan}
      />
    </Paper>
  );
};

export default ClienteForm;
