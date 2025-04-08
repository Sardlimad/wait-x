"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const InscripcionPriorizadaForm = ({
  onSubmit,
  rutas,
  fetchClienteByCI,
  initialData = null,
  isEditing = false,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cliente: { ci: "", nombre: "", apellidos: "", causa: "SMA" },
    rutasSeleccionadas: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [clienteEditable, setClienteEditable] = useState(false);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChangeCliente = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      cliente: { ...prev.cliente, [name]: value },
    }));
  };

  const buscarCliente = async () => {
    try {
      const cliente = await fetchClienteByCI(formData.cliente.ci);
      if (cliente) {
        setFormData((prev) => ({
          ...prev,
          cliente: { ...cliente },
        }));
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
      !formData.rutasSeleccionadas.includes(ruta.id) &&
      (ruta.codigo.toLowerCase().includes(filterText.toLowerCase()) ||
        ruta.origen.toLowerCase().includes(filterText.toLowerCase()) ||
        ruta.destino.toLowerCase().includes(filterText.toLowerCase()))
  );

  const toggleRouteSelection = (rutaId) => {
    setFormData((prev) => {
      const isSelected = prev.rutasSeleccionadas.includes(rutaId);
      const newSelection = isSelected
        ? prev.rutasSeleccionadas.filter((id) => id !== rutaId)
        : [...prev.rutasSeleccionadas, rutaId];

      return {
        ...prev,
        rutasSeleccionadas: newSelection.slice(0, 3), // Limit to 3 routes
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || "Error al guardar la inscripción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, m: 3, borderRadius: 2, boxShadow: 3 }}>
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
                ? "Editar Inscripción Priorizada"
                : "Registro de Inscripción Priorizada"}
            </Typography>
            <Box>
              <Button
                variant="contained"
                color={
                  formData.rutasSeleccionadas.length === 0
                    ? "disabled"
                    : "primary"
                }
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                disabled={loading || formData.rutasSeleccionadas.length === 0}
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
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Carnet de Identidad"
                name="ci"
                value={formData.cliente.ci}
                onChange={handleChangeCliente}
                margin="normal"
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
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.cliente.nombre}
                onChange={handleChangeCliente}
                margin="normal"
                disabled={!clienteEditable}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Apellidos"
                name="apellidos"
                value={formData.cliente.apellidos}
                onChange={handleChangeCliente}
                margin="normal"
                disabled={!clienteEditable}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth sx={{mt: 1}}>
                <InputLabel id="causa-prio-select-label">Causa de Priorización</InputLabel>
                <Select
                  labelId="causa-prio-select-label"
                  name="causa"
                  id="causa-prio-select"
                  value={formData.cliente.causa}
                  label="Causa de priorización"
                  onChange={handleChangeCliente}
                >
                  <MenuItem value={"SMA"}>SMA</MenuItem>
                  <MenuItem value={"FALLF"}>Fallecimiento de familiar</MenuItem>
                  <MenuItem value={"REC"}>Recluso</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        {/* Rutas Section */}
        <Grid item xs={12}>
          {/* <Typography variant="h6" gutterBottom>
            Seleccionar Rutas
          </Typography>
          <Divider sx={{ mb: 2 }} /> */}
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
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
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
                Rutas Seleccionadas {`${formData.rutasSeleccionadas.length}/3`}
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
                      formData.rutasSeleccionadas.includes(ruta.id)
                    )
                    .map((ruta) => (
                      <ListItem
                        key={ruta.id}
                        button="true"
                        onClick={() => toggleRouteSelection(ruta.id)}
                        sx={{
                          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                          borderRadius: 1,
                        }}
                      >
                        <Checkbox checked={true} />
                        <ListItemText
                          primary={`${ruta.origen} - ${ruta.destino} (${ruta.codigo}) `}
                        />
                      </ListItem>
                    ))}
                  {formData.rutasSeleccionadas.length === 0 && (
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
              {formData.rutasSeleccionadas.length === 3 && (
                <Alert variant="outlined" severity="warning" sx={{ mt: 1 }}>
                  Solo se pueden seleccionar hasta 3 rutas.
                </Alert>
                // <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                //   Solo se pueden seleccionar hasta 3 rutas.
                // </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InscripcionPriorizadaForm;
