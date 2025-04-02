"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import ClienteForm from "../../../components/forms/ClienteForm";
import { SystemAlert } from "../../../components/common/SystemAlert";

export default function ClientesPage() {
  const router = useRouter();
  const [alert, setAlert] = useState({
    open: false,
    status: "success",
    message: "",
  });

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (formData) => {
    try {I
      const response = await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el cliente");
      }

      setAlert({
        open: true,
        status: "success",
        message: "Cliente registrado exitosamente",
      });

      // Redirigir a la lista de clientes después de un breve delay
      setTimeout(() => {
        router.push("/clientes");
      }, 1500);
    } catch (error) {
      setAlert({
        open: true,
        status: "error",
        message: error.message || "Error al crear el cliente",
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <ClienteForm onSubmit={handleSubmit} />
      <SystemAlert
        open={alert.open}
        status={alert.status}
        message={alert.message}
        handleClose={handleCloseAlert}
      />
    </Box>
  );
}
