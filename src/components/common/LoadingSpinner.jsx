import { CircularProgress } from "@mui/material";
import React from "react";

export const LoadingSpinner = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <CircularProgress />
    </div>
  );
};
