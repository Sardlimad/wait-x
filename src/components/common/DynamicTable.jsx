"use client";
import React, { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  Tooltip,
  InputAdornment,
  alpha,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const DynamicTable = ({
  data,
  onEdit,
  onDelete,
  excludeFields = ['id'], // Campos a excluir de la tabla
  customHeaders = {}, // Nombres personalizados para los encabezados
  searchFields = [], // Campos por los que se puede buscar
  searchTerm = '', // Recibimos searchTerm como prop
  ...restProps // Resto de props que podrían ser pasadas
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [internalSearchTerm, setInternalSearchTerm] = useState(searchTerm);

  // Actualizar el término de búsqueda interno cuando cambie el prop externo
  useEffect(() => {
    setInternalSearchTerm(searchTerm);
    setPage(0); // Volver a la primera página cuando cambie la búsqueda
  }, [searchTerm]);

  // Obtener las columnas dinámicamente del primer elemento
  const columns = useMemo(() => {
    if (!data.length) return [];
    return Object.keys(data[0]).filter(field => !excludeFields.includes(field));
  }, [data, excludeFields]);

  // Filtrar datos según el término de búsqueda
  const filteredData = useMemo(() => {
    if (!internalSearchTerm) return data;
    
    return data.filter(item => {
      if (searchFields.length === 0) {
        return Object.values(item).some(value =>
          String(value).toLowerCase().includes(internalSearchTerm.toLowerCase())
        );
      }
      
      return searchFields.some(field =>
        String(item[field]).toLowerCase().includes(internalSearchTerm.toLowerCase())
      );
    });
  }, [data, internalSearchTerm, searchFields]);
  

  // Ordenar datos
  const sortedData = useMemo(() => {
    if (!orderBy) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      
      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    });
  }, [filteredData, orderBy, order]);

  // Manejar cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Manejar cambio de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Manejar ordenamiento
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Obtener el nombre de la columna (personalizado o por defecto)
  const getColumnName = (field) => {
    return customHeaders[field] || field.charAt(0).toUpperCase() + field.slice(1);
  };

  return (
    <Box sx={{ width: '100%' }} {...restProps}>
      <TableContainer sx={{ maxHeight: 600, border: 'none', boxShadow: 'none' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  key={column}
                  sx={{ 
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: '#fff',
                    fontWeight: 'bold'
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : 'asc'}
                    onClick={() => handleRequestSort(column)}
                    sx={{
                      color: '#fff !important',
                      '&.MuiTableSortLabel-active': {
                        color: '#fff !important',
                      },
                      '& .MuiTableSortLabel-icon': {
                        color: '#fff !important',
                      }
                    }}
                  >
                    {getColumnName(column)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell 
                align="center"
                sx={{ 
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 3 }}>
                  No hay datos para mostrar
                </TableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow 
                    hover 
                    key={index}
                    sx={{ 
                      '&:nth-of-type(odd)': {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
                      },
                      '&:last-of-type td, &:last-of-type th': {
                        border: 0,
                      }
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell key={column}>
                        {row[column]}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(row)}
                          sx={{
                            color: 'grey.500',
                            transition: 'color 0.2s ease',
                            '&:hover': {
                              color: theme => theme.palette.primary.main
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          onClick={() => onDelete(row)}
                          sx={{
                            color: 'grey.500',
                            transition: 'color 0.2s ease',
                            '&:hover': {
                              color: theme => theme.palette.error.main
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        sx={{ 
          borderTop: '1px solid #e0e0e0',
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03)
        }}
      />
    </Box>
  );
};

export default DynamicTable; 