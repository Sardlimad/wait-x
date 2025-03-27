import React from "react";
import ListView from "../../../components/ListView";
import { TextField } from "@mui/material";

export const InsRegulares = () => {
  return <ListView title={"Consulta de inscripciones regulares"} ResultTable={TextField}/>;
};

export default InsRegulares;