"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export const ListView = ({ title, showRegistrarBtn = true, children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type !== "string") {
      return React.cloneElement(child, { searchTerm });
    }
    return child;
  });

  return (
    <Box sx={{ m: { xs: 1, sm: 2, md: 4 }, p: { xs: 2, sm: 3 } }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs />
        <Grid item>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            {showRegistrarBtn && (
              <Link href={`${pathname}/registrar`}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  Registrar
                </Button>
              </Link>
            )}
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<KeyboardReturnIcon />}
              onClick={() => router.back()}
            >
              Regresar
            </Button>
          </Box>
        </Grid>
      </Grid>
      {childrenWithProps}
    </Box>
  );
};

export default ListView;
