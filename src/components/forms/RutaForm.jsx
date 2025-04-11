"use client";
import React, { useEffect, useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Card,
  CardContent,
  FormHelperText,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useRouter } from "next/navigation";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { localidadesData } from "../../test/DatosPrueba";

const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const RutaForm = ({
  onSubmit,
  initialData = null,
  isEditing = false,
}) => {
  const router = useRouter();
  const [localidades, setLocalidades] = useState([]); // Aquí deberías cargar las localidades desde tu API o contexto
  const [formData, setFormData] = useState({
    codigo: "",
    origen: null,  // Ahora almacenará el objeto completo
    destino: null  // Ahora almacenará el objeto completo
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Estado para las salidas
  const [salidas, setSalidas] = useState([]);
  const [nuevaSalida, setNuevaSalida] = useState({
    dia: "",
    hora: null,
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      // Si hay salidas previas, cargarlas
      if (initialData.salidas) {
        setSalidas(initialData.salidas);
      }
    }
  }, [initialData]);

  useEffect(() => {
    setLocalidades(localidadesData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSalida = (name, value) => {
    setNuevaSalida((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatTimeString = (date) => {
    if (!date) return "";

    // Use moment to format the time string
    return moment(date).format("HH:mm");
  };

  const agregarSalida = () => {
    if (!nuevaSalida.dia || !nuevaSalida.hora) return;

    // Crear una nueva salida con formato de hora seguro
    const nuevaSalidaObj = {
      id: Date.now(), // ID temporal para manejo local
      dia: nuevaSalida.dia,
      hora: formatTimeString(nuevaSalida.hora),
    };

    // Agregar a la lista de salidas y ordenar
    setSalidas((prev) => {
      const newSalidas = [...prev, nuevaSalidaObj];
      return newSalidas.sort((a, b) => {
        // Primero ordenar por día
        const diaIndexA = diasSemana.indexOf(a.dia);
        const diaIndexB = diasSemana.indexOf(b.dia);
        
        if (diaIndexA !== diaIndexB) {
          return diaIndexA - diaIndexB;
        }
        
        // Si los días son iguales, ordenar por hora
        return a.hora.localeCompare(b.hora);
      });
    });

    // Limpiar el formulario
    setNuevaSalida({
      dia: "",
      hora: null,
    });
  };

  const eliminarSalida = (id) => {
    setSalidas((prev) => prev.filter((salida) => salida.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Incluir las salidas en el envío
      const dataToSubmit = {
        ...formData,
        salidas: salidas,
      };

      await onSubmit(dataToSubmit);
    } catch (err) {
      setError(err.message || "Error al guardar la ruta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
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
              {isEditing ? "Editar Ruta" : "Registro de Ruta"}
            </Typography>
            <Box>
              <Button
                variant="contained"
                color={
                  !formData.codigo || !formData.origen || !formData.destino
                    ? "disabled"
                    : "primary"
                }
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !formData.codigo ||
                  !formData.origen ||
                  !formData.destino||
                  salidas.length === 0
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
          <Divider sx={{ mb: 3 }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Información de la Ruta
          </Typography>
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
              options={localidades || []}
              getOptionLabel={(option) => option.nombre || ""}
              value={formData.origen}
              onChange={(_, newValue) =>
                setFormData((prev) => ({
                  ...prev,
                  origen: newValue  // Guarda el objeto completo
                }))
              }
              isOptionEqualToValue={(option, value) => 
                option.id === value?.id
              }
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
              options={localidades || []}
              getOptionLabel={(option) => option.nombre || ""}
              value={formData.destino}
              onChange={(_, newValue) =>
                setFormData((prev) => ({
                  ...prev,
                  destino: newValue  // Guarda el objeto completo
                }))
              }
              isOptionEqualToValue={(option, value) => 
                option.id === value?.id
              }
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
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Horarios de Salida
          </Typography>

          {/* Formulario de nueva salida */}
          <Box
            sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <InputLabel id="dia-semana-label">
                    Día de la semana
                  </InputLabel>
                  <Select
                    labelId="dia-semana-label"
                    value={nuevaSalida.dia}
                    label="Día de la semana"
                    onChange={(e) => handleChangeSalida("dia", e.target.value)}
                  >
                    {diasSemana.map((dia) => (
                      <MenuItem key={dia} value={dia}>
                        {dia}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={5}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    label="Seleccionar hora"
                    value={nuevaSalida.hora}
                    onChange={(newValue) =>
                      handleChangeSalida("hora", newValue)
                    }
                    ampm={true}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid
                item
                xs={12}
                sm={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color={
                    !nuevaSalida.dia || !nuevaSalida.hora
                      ? "disabled"
                      : "secondary"
                  }
                  onClick={agregarSalida}
                  disabled={!nuevaSalida.dia || !nuevaSalida.hora}
                  startIcon={<AddIcon />}
                  fullWidth
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>

            {/* Lista de salidas */}
            <Card variant="outlined" sx={{ mt: 2 }}>
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                <List
                  dense
                  sx={{ width: "100%", maxHeight: "200px", overflow: "auto" }}
                >
                  {salidas.length === 0 ? (
                    <ListItem>
                      <ListItemText primary="No hay salidas programadas" />
                    </ListItem>
                  ) : (
                    salidas.map((salida) => (
                      <ListItem key={salida.id} divider>
                        <ListItemText
                          primary={`${salida.dia}`}
                          secondary={`Hora: ${salida.hora}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => eliminarSalida(salida.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  )}
                </List>
              </CardContent>
            </Card>
            <FormHelperText>
              *Las salidas serán guardadas junto con la información de la ruta
            </FormHelperText>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RutaForm;
