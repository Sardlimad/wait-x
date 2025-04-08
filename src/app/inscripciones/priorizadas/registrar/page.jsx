'use client';
import React from "react";
import InscripcionPriorizadaForm from "../../../../components/forms/InscripcionPriorizadaForm";

const InsPriorizadas = () => {
  const handleSubmit = async (data) => {
    // Logic to handle form submission
    console.log("Form submitted:", data);
  };

  const rutas = [
    { id: "1", codigo: "HAB-STG", origen: "La Habana", destino: "Santiago de Cuba" },
    { id: "2", codigo: "HAB-CFG", origen: "La Habana", destino: "Cienfuegos" },
    { id: "3", codigo: "CFG-STG", origen: "Cienfuegos", destino: "Santiago de Cuba" },
    { id: "4", codigo: "CFG-HAB", origen: "Cienfuegos", destino: "La Habana" },
    { id: "5", codigo: "STG-HAB", origen: "Santiago de Cuba", destino: "La Habana" },
    { id: "6", codigo: "STG-CFG", origen: "Santiago de Cuba", destino: "Cienfuegos" },
  ]; // Replace with API data

  const clientes = [
    { id: "1", nombre: "Juan", apellidos: "Pérez", ci: "12345678901", causa: "REC" },
    { id: "2", nombre: "Ana", apellidos: "Gómez", ci: "98765432109", causa: "SMA" },
  ]; // Replace with API data

  return (
    <InscripcionPriorizadaForm
      onSubmit={handleSubmit}
      rutas={rutas}
      clientes={clientes}
    />
  );
};

export default InsPriorizadas;