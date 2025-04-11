import { Box } from "@mui/material";
import React from "react";
import FalloForm from "../../../components/forms/FalloForm";
import { RutasFallo } from "../../../test/DatosPrueba";

export const page = () => {
  return (
    <Box sx={{ p: 3 }}>
      <FalloForm ruta={RutasFallo[0]}/>
    </Box>
  );
};

export default page;
export const metadata = {
  title: "Asignar Fallo",
  description: "Asignar un fallo a un cliente",
};
