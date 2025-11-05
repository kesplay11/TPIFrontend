// src/pages/PerfilView.jsx

import { useState, useEffect } from "react";
import { Typography, Card, Box, Divider, CircularProgress } from "@mui/material";
import { auth } from "../../localStorage/localstorage";
import personasService from "../../services/personas/PersonasServices"; // Asegúrate de que esta ruta sea correcta

// Componente presentacional para cada detalle
const PerfilItem = ({ label, value }) => (
    <Box sx={{ mb: 2, p: 1 }}>
        <Typography variant="body2" color="text.secondary">
            {label}
        </Typography>
        <Typography variant="h6" component="h3" sx={{ mt: 0.5, fontWeight: 'bold' }}>
            {value}
        </Typography>
        <Divider sx={{ mt: 1 }} />
    </Box>
);

export default function PerfilView() {
    const [persona, setPersona] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerfil = async () => {
            const persona_id = auth.getUserId(); // Obtiene el ID del token
            
            if (!persona_id) {
                setError("Usuario no autenticado o ID no encontrado.");
                setLoading(false);
                return;
            }

            try {
                // 1. Llama al servicio con el ID obtenido
                const data = await personasService.obtenerPersonaPorPersonaId(persona_id);
                
                // Si el backend devuelve un array (aunque sea de 1), ajusta.
                const perfilData = Array.isArray(data) ? data[0] : data; 

                setPersona(perfilData);
            } catch (err) {
                setError("No se pudieron cargar los datos del perfil.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfil();
    }, []); // El array vacío asegura que se ejecute solo al montar

    // --- Manejo de Estados de Renderizado ---
    
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" variant="h6" className="text-center p-8">
                {error}
            </Typography>
        );
    }
    
    // Si la persona es null o undefined por un error no capturado.
    if (!persona) {
         return (
            <Typography variant="h6" className="text-center p-8">
                Datos de perfil no disponibles.
            </Typography>
        );
    }
    
    // --- Renderizado Final ---

    return (
        <Box 
            className="flex items-center justify-center min-h-screen bg-gray-50 p-4"
            sx={{ 
                pt: 10, // Padding top para dejar espacio al Header
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <Card 
                className="w-full max-w-lg shadow-xl"
                sx={{ p: 4 }}
            >
                <Typography variant="h4" component="h2" className="text-center" color="primary" sx={{ mb: 3 }}>
                    Perfil de Usuario 👤
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <PerfilItem 
                    label="Nombre Completo" 
                    // Asegúrate de que tu backend devuelva el campo 'nombre'
                    value={persona.nombre || 'N/A'} 
                />
                
                <PerfilItem 
                    label="Rol de Usuario" 
                    // Idealmente, obtienes el rol del localStorage, no del objeto persona
                    value={auth.getUserRole() || 'Desconocido'} 
                />
                
                <PerfilItem 
                    label="Equipo" 
                    // Asumiendo que el campo se llama 'equipo' o 'equipo_id' en el objeto persona
                    value={persona.equipo || 'Sin equipo asignado'} 
                />
                
                <PerfilItem 
                    label="Correo Electrónico" 
                    // Asumiendo que el campo se llama 'correo'
                    value={persona.correo || 'N/A'} 
                />

                <PerfilItem 
                    label="Documento (DNI)" 
                    // Asumiendo que el campo se llama 'documento'
                    value={persona.documento || 'N/A'} 
                />

            </Card>
        </Box>
    );
}