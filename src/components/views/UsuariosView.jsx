"use client";
import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import DynamicTable from '../common/DynamicTable';
import ListView from '../ListView';
import { API_URL } from '../../config/settings';
import { useAuth } from '../../hooks/useAuth';

const UsuariosView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchWithToken } = useAuth();

  const fetchUsuarios = async () => {
    try {
      const response = await fetchWithToken(`${API_URL}/api/usuarios/`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al obtener los usuarios');
      }

      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      setError(err.message || 'Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = (usuario) => {
    console.log('Editar usuario:', usuario);
    // Implementar lógica de edición
  };

  const handleDelete = (usuario) => {
    console.log('Eliminar usuario:', usuario);
    // Implementar lógica de eliminación
  };

  const searchFields = ['usuario', 'nombre', 'apellidos', 'correo'];

  // Transformar el campo activo para mostrarlo como texto
  const transformData = (data) => {
    return data.map(item => ({
      ...item,
      // activo: item.activo ? 'Activo' : 'Inactivo'
    }));
  };

  return (
    <ListView title="Gestión de Usuarios">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error" style={{ padding: '20px' }}>
          {error}
        </Typography>
      ) : (
        <DynamicTable
          data={transformData(usuarios)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchFields={searchFields}
          excludeFields={['id', 'contraseña']}
        />
      )}
    </ListView>
  );
};

export default UsuariosView;