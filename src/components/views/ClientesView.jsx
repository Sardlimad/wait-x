"use client";

import React, { useEffect, useState } from "react";
import { Typography, Button, CircularProgress, Alert } from "@mui/material";
import DynamicTable from "../common/DynamicTable";
import ListView from "../ListView";
import { API_URL } from "../../config/settings";
import { useAuth } from "../../hooks/useAuth";
import { LoadingSpinner } from "../common/LoadingSpinner";

const ClientesView = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchWithToken } = useAuth();

  const fetchClientes = async () => {
    try {
      console.log("Obteniendo clientes con manejo automático de token...");

      const response = await fetchWithToken(`${API_URL}/api/clientes/`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error detallado:", errorData);
        throw new Error(errorData.detail || "Error al obtener los clientes");
      }

      const data = await response.json();
      console.log("Datos recibidos:", data, "clientes");
      setClientes(data);
    } catch (err) {
      console.error("Error al obtener clientes:", err);
      setError(err.message || "Error al cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEdit = (cliente) => {
    console.log("Editar cliente:", cliente);
  };

  const handleDelete = (cliente) => {
    console.log("Eliminar cliente:", cliente);
  };

  // Campos por los que se puede buscar
  const searchFields = ["ci", "nombre", "apellidos"];

  return (
    <ListView title="Lista de Clientes">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : (
        <DynamicTable
          data={clientes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchFields={searchFields}
          excludeFields={["id"]} // Excluir el ID
        />
      )}
    </ListView>
  );
};

export default ClientesView;
