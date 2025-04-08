"use client";
import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardView from '../../components/views/DashboardView';

export default function DashboardPage() {
  return (
    // <Box sx={{ p: 3 }}>
    //   <Typography variant="h4" component="h1" gutterBottom>
    //     Dashboard
    //   </Typography>
    //   <Typography variant="body1">
    //     Bienvenido al sistema de gestión de lista de espera.
    //   </Typography>
    // </Box>
    <DashboardView />
  );
} 