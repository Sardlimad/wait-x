"use client";

import React, { useEffect, useState } from "react";
import { Typography, Button, CircularProgress } from "@mui/material";
import DynamicTable from "../common/DynamicTable";
import ListView from "../ListView";
import { API_URL } from "../../settings/settings";
import { useAuth } from "../../hooks/useAuth";

const RutasView = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchWithToken } = useAuth();

  const fetchRutas = async () => {
    try {
      console.log("Obteniendo rutas con manejo automático de token...");

      // Con el serializer actualizado en el backend, ahora recibimos los nombres directamente
      const response = await fetchWithToken(`${API_URL}/api/rutas/`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error detallado:", errorData);
        throw new Error(errorData.detail || "Error al obtener las rutas");
      }

      const data = await response.json();
      console.log("Rutas recibidas:", data.length);
      setRutas(data);
    } catch (err) {
      console.error("Error al obtener rutas:", err);
      setError(err.message || "Error al cargar las rutas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRutas();
  }, []);

  // Función para reintentar la carga
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchRutas();
  };

  const handleEdit = (ruta) => {
    console.log("Editar ruta:", ruta);
  };

  const handleDelete = (ruta) => {
    console.log("Eliminar ruta:", ruta);
  };

  // Configuración personalizada para los encabezados de la tabla
  const customHeaders = {
    codigo: "Código",
    origen_nombre: "Origen",
    destino_nombre: "Destino",
    distancia: "Distancia (km)",
    duracion: "Duración (min)",
    precio: "Precio (CUP)"
  };

  // Campos por los que se puede buscar
  const searchFields = ["codigo", "origen_nombre", "destino_nombre"];

  // Campos a excluir de la visualización
  const excludeFields = ["id", "origen", "destino"];

  return (
    <ListView title="Lista de Rutas">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography color="error" style={{ marginBottom: '10px' }}>
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleRetry}>
            Reintentar
          </Button>
        </div>
      ) : (
        <DynamicTable
          data={rutas}
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

export default RutasView; 