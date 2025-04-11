"use client";
import React, { useEffect, useState } from "react";
import ListView from "../ListView";
import { Button, CircularProgress, Typography } from "@mui/material";
import DynamicTable from "../common/DynamicTable";
import { Fallos, RutasFallo } from "../../test/DatosPrueba";
import { useRouter, useSearchParams } from "next/navigation";

export const FallosView = () => {
  const router = useRouter();
  const [fallos, setFallos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFallos(RutasFallo);
    // Simulando una llamada a la API
    setLoading(false);
  }, []);

  // Campos por los que se puede buscar
  const searchFields = ["origen", "destino", "codigo"];

  return (
    <ListView title="Lista de Rutas con Fallos" showRegistrarBtn={false}>
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <CircularProgress />
        </div>
      ) : error ? (
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography color="error" style={{ marginBottom: "10px" }}>
            {error}
          </Typography>
          <Button variant="contained" color="primary">
            Reintentar
          </Button>
        </div>
      ) : (
        <DynamicTable
          data={fallos}
          // onEdit={handleEdit}
          // onDelete={handleDelete}
          // onAssign={() => {console.log("Asignar")}}
          onAssign={() => router.push("/fallos/asignar")}
          searchFields={searchFields}
          excludeFields={["id"]}
        />
      )}
    </ListView>
  );
};
