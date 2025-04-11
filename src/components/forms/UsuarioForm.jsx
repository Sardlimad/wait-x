"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  Paper,
  Divider,
  Grid,
  FormControlLabel,
  Switch,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useRouter } from "next/navigation";
import { userValidation } from "../../helpers/ValidationSchema";

const UsuarioForm = ({ onSubmit, initialData = null, isEditing = false }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [roles] = useState([
    { id: "Administrador", nombre: "Administrador" },
    { id: "Jefe de Turno", nombre: "Jefe de Turno" },
    { id: "Gestor de Inscripciones", nombre: "Gestor de Inscripciones" },
  ]);

  const formik = useFormik({
    initialValues: {
      usuario: "",
      contraseña: "",
      correo: "",
      nombre: "",
      apellidos: "",
      rol: "",
    },
    validationSchema: userValidation,
    onSubmit: async (values) => {
      setError("");
      setLoading(true);
      try {
        await onSubmit(values);
      } catch (err) {
        setError(err.message || "Error al guardar el usuario");
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

  return (
    <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {isEditing ? "Editar Usuario" : "Registro de Usuario"}
              </Typography>
              <Box>
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
          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Apellidos"
              name="apellidos"
              value={formik.values.apellidos}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.apellidos && Boolean(formik.errors.apellidos)
              }
              helperText={formik.touched.apellidos && formik.errors.apellidos}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Usuario"
              name="usuario"
              value={formik.values.usuario}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.usuario && Boolean(formik.errors.usuario)}
              helperText={formik.touched.usuario && formik.errors.usuario}
              required
              disabled={isEditing}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Correo"
              name="correo"
              type="email"
              value={formik.values.correo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.correo && Boolean(formik.errors.correo)}
              helperText={formik.touched.correo && formik.errors.correo}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contraseña"
              name="contraseña"
              type="password"
              value={formik.values.contraseña}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contraseña && Boolean(formik.errors.contraseña)
              }
              helperText={formik.touched.contraseña && formik.errors.contraseña}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Rol de Usuario"
              name="rol"
              value={formik.values.rol}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.rol && Boolean(formik.errors.rol)}
              helperText={formik.touched.rol && formik.errors.rol}
              required
            >
              <MenuItem value="">
                <em>Seleccione un rol</em>
              </MenuItem>
              {roles.map((rol) => (
                <MenuItem key={rol.id} value={rol.id}>
                  {rol.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UsuarioForm;
