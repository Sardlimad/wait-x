"use client";

import React, { useEffect, useState } from "react";
import { Typography, Button, CircularProgress } from "@mui/material";
import DynamicTable from "../common/DynamicTable";
import ListView from "../ListView";
import { API_URL } from "../../settings/settings";
import { useAuth } from "../../hooks/useAuth";

//Datos de prueba para la tabla
import { InscripcionesPriorizadas } from "../../test/DatosPrueba";

const InscripcionesPriorizadasView = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchWithToken } = useAuth();

//   const fetchInscripciones = async () => {
//     try {
//       console.log("Obteniendo inscripciones con manejo automático de token...");

//       const response = await fetchWithToken(`${API_URL}/api/inscripciones/`);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error detallado:", errorData);
//         throw new Error(errorData.detail || "Error al obtener las inscripciones");
//       }

//       const data = await response.json();
//       console.log("Datos recibidos:", data, "inscripciones");
//       setInscripciones(data);
//     } catch (err) {
//       console.error("Error al obtener inscripciones:", err);
//       setError(err.message || "Error al cargar las inscripciones");
//     } finally {
//       setLoading(false);
//     }
//   };

  useEffect(() => {
    // fetchInscripciones();
    setInscripciones(InscripcionesPriorizadas);
    setLoading(false);
  }, []);

  const handleEdit = (inscripcion) => {
    console.log("Editar inscripción:", inscripcion);
  };

  const handleDelete = (inscripcion) => {
    console.log("Eliminar inscripción:", inscripcion);
  };

  // Configuración personalizada para los encabezados de la tabla
  const customHeaders = {
    estudiante: "Estudiante",
    curso: "Curso",
    fecha_inscripcion: "Fecha de Inscripción",
    estado: "Estado",
  };

  // Campos por los que se puede buscar
  const searchFields = ["ruta", "cliente", "causa"];	

  // Campos a excluir de la visualización
  const excludeFields = ["id", "vigente"];

  return (
    <ListView title="Lista de Inscripciones Priorizadas">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography color="error" style={{ marginBottom: '10px' }}>
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={fetchInscripciones}>
            Reintentar
          </Button>
        </div>
      ) : (
        <DynamicTable
          data={inscripciones}
          onEdit={handleEdit}
          onDelete={handleDelete}
          customHeaders={customHeaders}
          searchFields={searchFields}
          excludeFields={excludeFields}
        />
      )}
    </ListView>
  );
};

export default InscripcionesPriorizadasView;
