import React, { useState, useEffect } from "react";
import api from "../service/urlApi";
import { Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { TablePagination, Grid2 } from "@mui/material";
import { Card, CardContent, CardMedia } from "@mui/material";

// Componente funcional Sedes
interface SedesProps {
    token: string;
    userAuth: {name: string};
    onLogout: () => void;
}

interface Sede {
    id: number;
    name: string;
    code: string;
    created_at: string;
    image: string;
}

const Sedes = ({ token, userAuth, onLogout } : SedesProps) => {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          const fetchedSedes = response.data.status.data.map((sede:Sede) => ({
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
    return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h6">{error}</Typography>
      </Container>
    );
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

      {/* VISTA PARA CARD */}
      <Grid2 container spacing={3} style={{ marginTop: "2rem" }}>
        {sedes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sede:Sede) => (
            <Card sx={{
                transition: "transform 0.3s",
                "&:hover": {
                transform: "scale(1.05)",
                },
            }}
            key={sede.id}
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

export default Sedes;
