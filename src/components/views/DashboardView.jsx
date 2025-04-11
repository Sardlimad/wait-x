import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Box,
  Paper,
  Typography,
  Grid,
  useTheme
} from "@mui/material";
import {
  InscripcionesRegulares,
  InscripcionesPriorizadas,
} from "../../test/DatosPrueba";
import "chart.js/auto";

const DashboardView = () => {
  const theme = useTheme();

  // Prepare data for the charts
  const registrosPorHora = Array(24).fill(0);
  InscripcionesRegulares.forEach(({ fecha_inscripcion }) => {
    const hour = new Date(fecha_inscripcion).getHours();
    registrosPorHora[hour]++;
  });

  const causasPriorizadas = InscripcionesPriorizadas.reduce(
    (acc, { causa }) => {
      acc[causa] = (acc[causa] || 0) + 1;
      return acc;
    },
    {}
  );

  // Chart data
  const barData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: "Registros por Hora",
        data: registrosPorHora,
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
        pointStyle: "circle",
        pointRadius: 5,
        pointBackgroundColor: theme.palette.primary.dark,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(causasPriorizadas),
    datasets: [
      {
        label: "Causas Priorizadas",
        data: Object.values(causasPriorizadas),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ].map(color => `${color}B3`), // Adding 70% opacity
        borderColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={7}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", mb: 3 }}
            >
              Registros por Hora
            </Typography>
            <Box sx={{ flex: 1, minHeight: 300 }}>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "top" },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", mb: 3 }}
            >
              Causas Priorizadas
            </Typography>
            <Box sx={{ flex: 1, minHeight: 300 }}>
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "top" },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardView;
