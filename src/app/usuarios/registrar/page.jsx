"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import UsuarioForm from "../../../components/forms/UsuarioForm";
import { SystemAlert } from "../../../components/common/SystemAlert";

export default function UsuariosPage() {
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
    try {
      // Aquí irá la lógica de la API posteriormente
      setAlert({
        open: true,
        status: "success",
        message: "Usuario registrado exitosamente",
      });

      // Redirigir a la lista de usuarios después de un breve delay
      // setTimeout(() => {
        router.push("/usuarios");
      // }, 1500);
    } catch (error) {
      setAlert({
        open: true,
        status: "error",
        message: error.message || "Error al crear el usuario",
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <UsuarioForm onSubmit={handleSubmit} />
      <SystemAlert
        open={alert.open}
        status={alert.status}
        message={alert.message}
        handleClose={handleCloseAlert}
      />
    </Box>
  );
}