// src/pages/PerfilView.jsx

import { useState, useEffect } from "react";
import { Typography, Card, Box, Divider, CircularProgress } from "@mui/material";
import { auth } from "../../../localStorage/localstorage";
import personasService from "../../../services/personas/PersonasServices"; // Asegúrate de que esta ruta sea correcta
import PerfilItem from "./components/PerfilItem";
import EstadoBadge from "../Juegos/components/TextEstado";


 export default function PerfilView() {
    const [persona, setPersona] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerfil = async () => {
            const persona_id = auth.getUserID(); // Obtiene el ID del token
            
            if (!persona_id) {
                setError("Usuario no autenticado o ID no encontrado.");
                setLoading(false);
                return;
            }

            try {
                //1. Llama al servicio con el ID obtenido
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
        <div className='bg-[#f5f7f8]'>
                <Typography variant="h6" component="h2" className="text-center font-bold" color="black" sx={{  padding:3 }}>
                    Perfil
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <PerfilItem 
                    label="Hola!!" 
                    value={persona.nombre || 'N/A'}
                />

                <PerfilItem 
                    label="Correo Electrónico" 
                    // Asumiendo que el campo se llama 'correo'
                    value={persona.correo || 'N/A'} 
                />
                
                <PerfilItem 
                    label="Equipo" 
                    // Asumiendo que el campo se llama 'equipo' o 'equipo_id' en el objeto persona
                    value={persona.equipo || 'Sin equipo asignado'} 
                />

                <PerfilItem 
                    label="Documento (DNI)" 
                    // Asumiendo que el campo se llama 'documento'
                    value={persona.documento || 'N/A'} 
                />
                
        </div>
    );
}