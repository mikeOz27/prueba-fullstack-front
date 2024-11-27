import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Container, Typography, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const Sedes = ({token, userAuth, onLogout}) => {
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
        const api_key = btoa("Y2FORUpSMmk0YjkyS2ZqM3QweFRrTUxrTUNSeHlEcERnOTRPY2FORUpSMmk0YjkyS2ZqM3QweFRrTUxrTUNSeHlEcERnOTRP"); // Incluye la clave en el header
        let isMounted = true;
        const GetRole = async () => {
            try {
                const response = await api.get('/get_location',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Api_key_authorized: api_key
                    }
                });

                if (isMounted) {
                    const fetchedSedes = response.data.status.data
                        .map(sede => ({ ...sede }));
                    setSedes(fetchedSedes);
                }
            } catch (error) {
                setError('Error al obtener los sedes');
                console.error('Error al obtener los sedes:', error);
            }
        };
        GetRole();
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">Cargando...</Typography>
            </Container>
        );
    }

    if (error) {
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h6">{error}</Typography>
        </Container>
    }

    return (
    <Container>
        <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
        Bienvenido a la Plataforma de Localización de Sedes
    </Typography>
        <Button onClick={onLogout} variant="contained" color="primary" style={{ marginBottom: '2rem' }}>
        Logout - {userAuth.name} 🗝️
    </Button>
    <Typography variant="h5" gutterBottom>
        Localización de Sedes
    </Typography>
        <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
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
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sedes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ marginTop: '1rem' }}
    />
    </Container>
    );

};

export default Sedes;
