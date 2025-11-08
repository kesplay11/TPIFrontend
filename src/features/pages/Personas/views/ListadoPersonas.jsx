// src/pages/PerfilView.jsx

import { useState, useEffect } from "react";
import { Typography, Card, Box, Divider, CircularProgress } from "@mui/material";
import { auth } from "../../../../localStorage/localstorage";
import personasService from "../../../../services/personas/PersonasServices";
import CardPersona from "../components/CardPersona";

 export default function PersonasView() {
    const [personas, setPersonas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPersonas = async () => {
            const persona_id = auth.getUserID(); // Obtiene el ID del token
            
            if (!persona_id) {
                setError("Usuario no autenticado o ID no encontrado.");
                setLoading(false);
                return;
            }

            try {
                //1. Llama al servicio con el ID obtenido
                const data = await personasService.obtenerPersonas();

                setPersonas(data);
            } catch (err) {
                setError("No se pudieron cargar los datos del perfil.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPersonas();
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
    if (!personas) {
         return (
            <Typography variant="h6" className="text-center p-8">
                Datos de personas no disponibles.
            </Typography>
        );
    }
    
    // --- Renderizado Final ---

    return (
        <div className='bg-[#f5f7f8]'>
            <Typography variant="h6" component="h2" className="text-center font-bold" color="black" sx={{  padding:3 }}>
                    Personas
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {personas.map((item) => 
                <CardPersona 
                    key={item.persona_id}
                    {...item}
                />
            )}
        </div>
    );
}