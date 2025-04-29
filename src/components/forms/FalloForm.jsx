"use client";
import React, { useState, useEffect, use } from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { clientesData } from "../../test/DatosPrueba";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { get } from "http";
import { useRouter } from "next/navigation";

const FalloForm = ({ ruta }) => {
  const router = useRouter();
  // Estados para manejar los datos
  const [clientes, setClientes] = useState([]);
  const [clienteActual, setClienteActual] = useState(null);
  const [estadisticas, setEstadisticas] = useState({
    asignados: 0,
    total: ruta?.capacidad,
  });

  useEffect(() => {
    // Simulación de la obtención de los clientes y estadísticas
    const fetchClientes = async () => {
      setClientes([...clientesData]);
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    if (clientes.length > 0 && !clienteActual) {
      getNextCliente();
    }
  }, [clientes]);

  const getNextCliente = () => {
    if (clientes.length > 0) {
      const nextCliente = clientes[clientes.length - 1];
      setClientes((prevClientes) => prevClientes.slice(0, -1));
      setClienteActual(nextCliente);
    } else {
      setClienteActual(null);
    }
  };

  // Función para mostrar el tipo de inscripción
  const TipoInscripcion = ({ tipo }) => (
    <Chip
      label={tipo}
      color={tipo === "Priorizada" ? "error" : "primary"}
      size="small"
      sx={{ ml: 1 }}
    />
  );
  const onAsignar = (id) => {
    console.log("Asignar cliente con ID:", id);
    // Aquí puedes agregar la lógica para asignar el cliente
    setEstadisticas((prev) => ({
      ...prev,
      asignados: prev.asignados + 1,
    }));
    getNextCliente(); // Obtener el siguiente cliente después de asignar
  };

  const onDescartar = (id) => {
    console.log("Descartar cliente con ID:", id);
    // Aquí puedes agregar la lógica para descartar el cliente
    getNextCliente(); // Obtener el siguiente cliente después de descartar
  };
  // Simulación de la obtención del cliente actual y estadísticas

  return (
    <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
      {/* Header */}
      <Grid item xs={12}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: "primary.main" }}>
            Asignación de Fallos
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<KeyboardReturnIcon />}
            onClick={() => router.back()}
          >
            Regresar
          </Button>
        </Box>
        <Divider />
      </Grid>

      {/* Contenido Principal en 2 Columnas */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Columna Izquierda - Información de la Ruta */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="primary">
              Información de la Ruta
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Código:</strong> {ruta?.codigo}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Origen:</strong> {ruta?.origen}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Destino:</strong> {ruta?.destino}
              </Typography>
            </Box>
            
            {/* Barra de Progreso */}
            <Typography variant="subtitle1" gutterBottom>
              Pasajes Asignados: {estadisticas.asignados}/{estadisticas.total}
            </Typography>
            <Box sx={{
              width: "100%",
              height: 8,
              bgcolor: "grey.200",
              borderRadius: 4,
              overflow: "hidden",
            }}>
              <Box sx={{
                width: `${(estadisticas.asignados / estadisticas.total) * 100}%`,
                height: "100%",
                bgcolor: "primary.main",
                transition: "width 0.5s ease-in-out",
              }} />
            </Box>
          </Paper>
        </Grid>

        {/* Columna Derecha - Información del Cliente */}
        <Grid item xs={12} md={6}>
          {estadisticas.asignados === estadisticas.total ? (
            <Paper variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Fallos cubiertos
              </Typography>
            </Paper>
          ) : clienteActual ? (
            <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" color="primary">
                  Cliente en Turno
                  <TipoInscripcion tipo={clienteActual.priorizado ? "Priorizada" : "Regular"} />
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Número en cola: {clienteActual.numeroEnCola}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>CI:</strong> {clienteActual.ci}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Nombre:</strong> {clienteActual.nombre}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Apellidos:</strong> {clienteActual.apellidos}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 'auto' }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => onDescartar(clienteActual.id)}
                >
                  Descartar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => onAsignar(clienteActual.id)}
                >
                  Asignar
                </Button>
              </Box>
            </Paper>
          ) : (
            <Paper variant="outlined" sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No hay más clientes en la lista de espera
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FalloForm;
