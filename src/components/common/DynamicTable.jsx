"use client";
import React, { useState, useMemo, useEffect } from "react";
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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import { styled } from "@mui/system";
import { columnsNameDictionary } from "../../config/coumnsNameDictionary";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.2)
      : alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  borderRadius: "8px",
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(0, 0, 0, 0.2)"
      : "0 4px 20px rgba(0, 0, 0, 0.05)",
  overflowY: "auto",
  overflowX: "hidden",
  // overflow: 'hidden',
  // maxHeight: 600,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  padding: "16px",
  "&.header": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.primary.main, 0.2)
        : alpha(theme.palette.primary.main, 0.1),
    color:
      theme.palette.mode === "dark"
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    fontWeight: 600,
    fontSize: "0.875rem",
  },
}));

const actionsComponents = {
  asign: (onAssign, row) => (
    <Tooltip title="Asignar" arrow>
      <IconButton
        size="small"
        onClick={() => onAssign(row)}
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          },
        }}
      >
        <AssignmentTurnedInRoundedIcon fontSize="small" color="primary" />
      </IconButton>
    </Tooltip>
  ),
  edit: (onEdit, row) => (
    <Tooltip title="Editar" arrow>
      <IconButton
        size="small"
        onClick={() => onEdit(row)}
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          },
        }}
      >
        <EditIcon fontSize="small" color="primary" />
      </IconButton>
    </Tooltip>
  ),
  delete: (onDelete, row) => (
    <Tooltip title="Eliminar" arrow>
      <IconButton
        size="small"
        onClick={() => onDelete(row)}
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1),
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.error.main, 0.2),
          },
        }}
      >
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
    </Tooltip>
  ),
};

const DynamicTable = ({
  data,
  onEdit,
  onDelete,
  onAssign,
  excludeFields = ["id"], // Campos a excluir de la tabla
  searchFields = [], // Campos por los que se puede buscar
  searchTerm = "", // Recibimos searchTerm como prop
  ...restProps // Resto de props que podrían ser pasadas
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [internalSearchTerm, setInternalSearchTerm] = useState(searchTerm);

  // Actualizar el término de búsqueda interno cuando cambie el prop externo
  useEffect(() => {
    setInternalSearchTerm(searchTerm);
    setPage(0); // Volver a la primera página cuando cambie la búsqueda
  }, [searchTerm]);

  // Obtener las columnas dinámicamente del primer elemento
  const columns = useMemo(() => {
    if (!data.length) return [];
    return Object.keys(data[0]).filter(
      (field) => !excludeFields.includes(field)
    );
  }, [data, excludeFields]);

  // Filtrar datos según el término de búsqueda
  const filteredData = useMemo(() => {
    if (!internalSearchTerm) return data;

    return data.filter((item) => {
      if (searchFields.length === 0) {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(internalSearchTerm.toLowerCase())
        );
      }

      return searchFields.some((field) =>
        String(item[field])
          .toLowerCase()
          .includes(internalSearchTerm.toLowerCase())
      );
    });
  }, [data, internalSearchTerm, searchFields]);

  // Ordenar datos
  const sortedData = useMemo(() => {
    if (!orderBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (order === "asc") {
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
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Obtener el nombre de la columna (personalizado o por defecto)
  const getColumnName = (field) => {
    return (
      columnsNameDictionary[field] ||
      field.charAt(0).toUpperCase() + field.slice(1)
    );
  };

  return (
    <Box sx={{ width: "100%", p: 0 }} {...restProps}>
      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column} className="header">
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={() => handleRequestSort(column)}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "inherit !important",
                        opacity: 0.5,
                      },
                    }}
                  >
                    {getColumnName(column)}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
              <StyledTableCell align="center" className="header">
                Acciones
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <StyledTableCell
                  colSpan={columns.length + 1}
                  align="center"
                  sx={{
                    py: 8,
                    color: "text.secondary",
                    fontSize: "0.875rem",
                  }}
                >
                  No hay datos para mostrar
                </StyledTableCell>
              </TableRow>
            ) : (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    key={index}
                    sx={{
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.05),
                        transform: "scale(1.001)",
                      },
                    }}
                  >
                    {columns.map((column) => (
                      <StyledTableCell key={column}>
                        {row[column]}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                          opacity: 0.7,
                          transition: "opacity 0.2s ease",
                          "&:hover": { opacity: 1 },
                        }}
                      >
                        {onEdit && actionsComponents.edit(onEdit, row)}
                        {onDelete && actionsComponents.delete(onDelete, row)}
                        {onAssign && actionsComponents.asign(onAssign, row)}
                      </Box>
                    </StyledTableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

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
          mt: 2,
          borderRadius: "12px",
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.03),
          "& .MuiToolbar-root": {
            borderRadius: "12px",
            padding: "8px 16px",
          },
        }}
      />
    </Box>
  );
};

export default DynamicTable;
