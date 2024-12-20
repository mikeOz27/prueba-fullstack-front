/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Container, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { Card, CardContent, CardMedia, Grid2 } from "@mui/material";

const Sedes = ({ token, userAuth, onLogout }) => {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (sedes.length > 0) {
      setLoading(false);
    }
  }, [sedes]);

  // Aquí va la URL de tu API de localización de sedes
  useEffect(() => {
    const api_key = btoa(
      "Y2FORUpSMmk0YjkyS2ZqM3QweFRrTUxrTUNSeHlEcERnOTRPY2FORUpSMmk0YjkyS2ZqM3QweFRrTUxrTUNSeHlEcERnOTRP"
    ); // Incluye la clave en el header
    let isMounted = true;
    const GetSede = async () => {
      try {
        const response = await api.get("/get_location", {
          headers: {
            Authorization: `Bearer ${token}`,
            Api_key_authorized: api_key,
          },
        });

        if (isMounted) {
          const fetchedSedes = response.data.status.data.map((sede) => ({
            ...sede,
          }));
          setSedes(fetchedSedes);
        }
      } catch (error) {
        setError("Error al obtener los sedes");
        console.error("Error al obtener los sedes:", error);
        // redirectToLogin();
      }
    };
    GetSede();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">Cargando...</Typography>
      </Container>
    );
  }

  if (error) {
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h6">{error}</Typography>
    </Container>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
        Bienvenido a la Plataforma de Localización de Sedes
      </Typography>
      <Button
        onClick={onLogout}
        variant="contained"
        color="primary"
        style={{ marginBottom: "2rem" }}
      >
        Logout - {userAuth.name} 🗝️
      </Button>
      <Typography variant="h5" gutterBottom>
        Localización de Sedes
      </Typography>

      {/* VISTA PARA DASHBOARD */}
      {/* <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Imagen</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Código</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sedes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sede) => (
                            <TableRow key={sede.id}>
                                <TableCell>
                                    <Avatar src={sede.image} alt={sede.name} />
                                </TableCell>
                                <TableCell>{sede.name}</TableCell>
                                <TableCell>{sede.code}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
      {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sedes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ marginTop: '1rem' }}
            /> */}
      {/* FIN VISTA DASHBOARD */}

      {/* VISTA PARA CARD */}
      <Grid2 container spacing={3} style={{ marginTop: "2rem" }}>
        {sedes
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((sede) => (
            <Grid2 item xs={12} sm={6} md={4} key={sede.id}>
              <Card
                sx={{
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt={sede.name}
                  height="140"
                  image={sede.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {sede.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Código: {sede.code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha de Creación: {sede.created_at}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
      </Grid2>
      <TablePagination
        component="div"
        count={sedes.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

// Valida las props con PropTypes
Sedes.propTypes = {
  token: PropTypes.string.isRequired,
  userAuth: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Sedes;
