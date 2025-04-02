"use client";
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Fade,
  Box,
  Typography,
} from '@mui/material';
import QRScanner from './QRScanner';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

const QRScannerModal = ({ open, onClose, onScan }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleScan = (data) => {
    
    if (data && onScan) {
      onScan(data);      
      handleClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={modalStyle}>
          {/* <Typography variant="h6" component="h2" gutterBottom>
            Escanear Código QR
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Por favor, escanee el código QR del carnet de identidad.
          </Typography> */}
          <QRScanner onScan={handleScan} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default QRScannerModal; 