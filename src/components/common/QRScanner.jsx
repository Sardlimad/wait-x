"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import { QrCodeScanner } from '@mui/icons-material';
import Image from 'next/image';

const QRScanner = ({ onScan }) => {
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(true);
  const [buffer, setBuffer] = useState('');
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const isMounted = useRef(true);

  // Inicializar el escáner cuando el componente se monte
  useEffect(() => {
    isMounted.current = true;
    setScanning(true);
    
    return () => {
      isMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setScanning(false);
      setBuffer('');
      setLines([]);
      setError('');
    };
  }, []);

  useEffect(() => {
    if (!scanning || !isMounted.current) return;
    
    const handleKeyDown = (event) => {
      if (!isMounted.current) return;
      
      
      // Ignorar teclas especiales
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) {
        return;
      }

      // Si es Enter, agregar la línea al array de líneas
      if (event.key === 'Enter') {
        if (buffer.trim()) {
          const [key, value] = buffer.trim().split(':');
          // Solo agregar líneas que empiecen con N, A o CI
          if (['N', 'A', 'CI'].includes(key)) {
            // Si es la línea A (apellidos), asegurarnos de que no incluya FV
            if (key === 'A') {
              const cleanValue = value.split('FV:')[0].trim();
              setLines(prev => [...prev, `${key}:${cleanValue}`]);
            } else {
              setLines(prev => [...prev, buffer.trim()]);
            }
          }
          setBuffer('');
        }
        return;
      }

      // Agregar el carácter al buffer
      setBuffer(prev => {
        const newBuffer = prev + event.key;
        return newBuffer;
      });

      // Resetear el timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (isMounted.current) {
          setBuffer('');
          setLines([]);
          setScanning(false);
        }
      }, 1000);
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scanning, buffer]);

  useEffect(() => {
    if (!isMounted.current) return;
    
    if (lines.length >= 3) {
      handleScan(lines.join('\n'));
      // Limpiar el estado después de procesar
      setLines([]);
      setBuffer('');
      setScanning(false);
    }
  }, [lines]);

  const handleScan = (data) => {
    if (!isMounted.current) return;
    
    if (!data) return;

    try {
      const lines = data.split('\n');
      const dataObj = {};
      
      lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
          dataObj[key.trim()] = value.trim();
        }
      });


      if (!dataObj.N || !dataObj.A || !dataObj.CI) {
        throw new Error('Formato de QR no válido');
      }

      const parsedData = {
        nombre: dataObj.N,
        apellidos: dataObj.A,
        ci: dataObj.CI
      };

      onScan(parsedData);
      // Asegurarnos de que el escáner se detenga
      setScanning(false);
    } catch (err) {
      console.error('Error processing scan:', err);
      setError('Error al procesar el código QR. Asegúrese de que sea un carnet de identidad válido.');
    }
  };

  return (
    <Box 
      ref={containerRef}
      sx={{ 
        width: '100%', 
        textAlign: 'center',
        outline: 'none',
        tabIndex: 0,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 2
      }}>
        <QrCodeScanner sx={{ fontSize: 60, color: 'primary.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Escaneando código QR
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Por favor, mantenga el código QR frente al escáner
        </Typography>
      </Box>

      {/* <Box sx={{ 
        position: 'relative',
        width: '100%',
        maxWidth: '300px',
        height: '200px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        mb: 2
      }}>
        <Image
          src="/images/ci_cuba.png"
          alt="Carnet de Identidad Cubano"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box> */}

      {scanning && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} />
          <Typography variant="body2" color="text.secondary">
            Escaneando...
          </Typography>
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default QRScanner; 