"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { regularInscriptionValidation } from "../../helpers/ValidationSchema";
import {
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  Grid,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { SystemAlert } from "../common/SystemAlert";

const InscripcionRegularForm = ({
  onSubmit,
  rutas,
  fetchClienteByCI,
  initialData = null,
  isEditing = false,
}) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [clienteEditable, setClienteEditable] = useState(false);
  const [filterText, setFilterText] = useState("");

  const formik = useFormik({
    initialValues: {
      cliente: {
        ci: "",
        nombre: "",
        apellidos: "",
      },
      rutasSeleccionadas: [],
    },
    validationSchema: regularInscriptionValidation,
    onSubmit: async (values) => {
      setError("");
      setLoading(true);
      try {
        await onSubmit(values);
      } catch (err) {
        setError(err.message || "Error al guardar la inscripción");
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

  const buscarCliente = async () => {
    try {
      const cliente = await fetchClienteByCI(formik.values.cliente.ci);
      if (cliente) {
        formik.setFieldValue("cliente", cliente);
        setClienteEditable(false);
      } else {
        setClienteEditable(true);
      }
    } catch (err) {
      setError("Error al buscar el cliente");
    }
  };

  const filteredRutas = rutas.filter(
    (ruta) =>
      !formik.values.rutasSeleccionadas.includes(ruta.id) &&
      (ruta.codigo.toLowerCase().includes(filterText.toLowerCase()) ||
        ruta.origen.toLowerCase().includes(filterText.toLowerCase()) ||
        ruta.destino.toLowerCase().includes(filterText.toLowerCase()))
  );

  const toggleRouteSelection = (rutaId) => {
    const currentSelection = formik.values.rutasSeleccionadas;
    const isSelected = currentSelection.includes(rutaId);
    let newSelection;

    if (isSelected) {
      newSelection = currentSelection.filter((id) => id !== rutaId);
    } else if (currentSelection.length < 3) {
      newSelection = [...currentSelection, rutaId];
    } else {
      return; // No hacer nada si ya hay 3 rutas seleccionadas
    }

    formik.setFieldValue("rutasSeleccionadas", newSelection);
  };

  return (
    <Paper sx={{ p: 3, m: 3, borderRadius: 2, boxShadow: 3 }}>
      <form onSubmit={formik.handleSubmit}>
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
                {isEditing
                  ? "Editar Inscripción Regular"
                  : "Registro de Inscripción Regular"}
              </Typography>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  color={
                    !formik.isValid ||
                    formik.values.rutasSeleccionadas.length === 0
                      ? "disabled"
                      : "primary"
                  }
                  startIcon={<SaveIcon />}
                  disabled={
                    !formik.isValid ||
                    formik.isSubmitting ||
                    loading ||
                    formik.values.rutasSeleccionadas.length === 0
                  }
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

          {/* Cliente Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Datos del Cliente
            </Typography>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Carnet de Identidad"
                  name="cliente.ci"
                  value={formik.values.cliente.ci}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.cliente?.ci && formik.errors.cliente?.ci)}
                  helperText={formik.touched.cliente?.ci && formik.errors.cliente?.ci}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={buscarCliente}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      position: 'absolute',
                      bottom: '-20px',
                    },
                    mb: 3  // Añade margen inferior para el texto de ayuda
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="cliente.nombre"
                  value={formik.values.cliente.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cliente?.nombre && Boolean(formik.errors.cliente?.nombre)}
                  helperText={formik.touched.cliente?.nombre && formik.errors.cliente?.nombre}
                  disabled={!clienteEditable}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      position: 'absolute',
                      bottom: '-20px',
                    },
                    mb: 3  // Añade margen inferior para el texto de ayuda
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  name="cliente.apellidos"
                  value={formik.values.cliente.apellidos}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cliente?.apellidos && Boolean(formik.errors.cliente?.apellidos)}
                  helperText={formik.touched.cliente?.apellidos && formik.errors.cliente?.apellidos}
                  disabled={!clienteEditable}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      position: 'absolute',
                      bottom: '-20px',
                    },
                    mb: 3  // Añade margen inferior para el texto de ayuda
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Rutas Section */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {/* Available Routes */}
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Rutas Disponibles
                </Typography>
                <Paper
                  sx={{
                    maxHeight: 300,
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Filtrar rutas..."
                    variant="outlined"
                    size="small"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <List>
                    {filteredRutas.map((ruta) => (
                      <ListItem
                        key={ruta.id}
                        button="true"
                        onClick={() => toggleRouteSelection(ruta.id)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                          },
                          borderRadius: 1,
                        }}
                      >
                        <Checkbox checked={false} />
                        <ListItemText
                          primary={`${ruta.origen} - ${ruta.destino} (${ruta.codigo}) `}
                        />
                      </ListItem>
                    ))}
                    {filteredRutas.length === 0 && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                      >
                        No se encontraron rutas.
                      </Typography>
                    )}
                  </List>
                </Paper>
              </Grid>

              {/* Selected Routes */}
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Rutas Seleccionadas{" "}
                  {`${formik.values.rutasSeleccionadas.length}/3`}
                </Typography>
                <Paper
                  sx={{
                    maxHeight: 300,
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  <List>
                    {rutas
                      .filter((ruta) =>
                        formik.values.rutasSeleccionadas.includes(ruta.id)
                      )
                      .map((ruta) => (
                        <ListItem
                          key={ruta.id}
                          button="true"
                          onClick={() => toggleRouteSelection(ruta.id)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                            borderRadius: 1,
                          }}
                        >
                          <Checkbox checked={true} />
                          <ListItemText
                            primary={`${ruta.origen} - ${ruta.destino} (${ruta.codigo}) `}
                          />
                        </ListItem>
                      ))}
                    {formik.values.rutasSeleccionadas.length === 0 && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                      >
                        No hay rutas seleccionadas.
                      </Typography>
                    )}
                  </List>
                </Paper>
                {formik.values.rutasSeleccionadas.length === 3 && (
                  <Alert variant="outlined" severity="warning" sx={{ mt: 1 }}>
                    Solo se pueden seleccionar hasta 3 rutas.
                  </Alert>
                )}
                {formik.values.rutasSeleccionadas.length === 0 && (
                  <Alert variant="outlined" severity="warning" sx={{ mt: 1 }}>
                    Es necesario seleccionar al menos 1 ruta.
                  </Alert>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {formik.errors.rutasSeleccionadas && formik.touched.rutasSeleccionadas && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {formik.errors.rutasSeleccionadas}
          </Alert>
        )}
        {/* {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )} */}
        {
          <SystemAlert open={error} status={"error"} message={error} handleClose={()=> setError("")}/>
        }
      </form>
    </Paper>
  );
};

export default InscripcionRegularForm;
