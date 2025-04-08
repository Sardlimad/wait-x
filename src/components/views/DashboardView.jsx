import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  InscripcionesRegulares,
  InscripcionesPriorizadas,
} from "../../test/DatosPrueba";
import "chart.js/auto";

const DashboardView = () => {
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
            backgroundColor: "rgba(56, 120, 209, 0.6)", // Using secondary.main color
            borderColor: "rgba(30, 77, 140, 1)", // Using primary.main color
            borderWidth: 1,
            pointStyle: "circle",
            pointRadius: 5,
            pointBackgroundColor: "rgba(42, 93, 163, 0.8)", // Using primary gradient end color
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
                "rgba(30, 77, 140, 0.7)",  // primary.main
                "rgba(56, 120, 209, 0.7)", // secondary.main 
                "rgba(2, 136, 209, 0.7)",  // info.main
                "rgba(84, 110, 122, 0.7)", // text.secondary
                "rgba(189, 189, 189, 0.7)" // Neutral gray
            ],
            borderColor: [
                "rgba(30, 77, 140, 1)",
                "rgba(56, 120, 209, 1)",
                "rgba(2, 136, 209, 1)", 
                "rgba(84, 110, 122, 1)",
                "rgba(189, 189, 189, 1)"
            ],
            borderWidth: 1,
        },
    ],
};

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <h1 style={{ width: "100%", textAlign: "center" }}>Dashboard</h1>
      <div
        style={{
          flex: "1 1 calc(50% - 20px)",
          maxWidth: "calc(50% - 20px)",
          minWidth: "300px",
          background: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Registros por Hora
        </h2>
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
      <div
        style={{
          flex: "1 1 calc(50% - 20px)",
          maxWidth: "calc(30% - 20px)",
          minWidth: "300px",
          background: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Causas Priorizadas
        </h2>
        <Pie
          data={pieData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
    </div>
  );
};

export default DashboardView;
