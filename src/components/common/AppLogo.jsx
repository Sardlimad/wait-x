import { Box } from "@mui/material";
import React from "react";

export const AppLogo = ({ size =60 }) => {
  return (
    <Box
      component="img"
      src="/app_logo.png"
      alt="App Logo"
      sx={{
        width: size,
        height: size,
        my: 2,
        // filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
        filter: "invert(1)",
        // transition: 'filter 0.3s ease',
      }}
    />
  );
};
