// src/pages/PerfilView.jsx

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Box, CircularProgress, Button } from "@mui/material";
import { auth } from "../../localStorage/authStorage";
import personasService from "../../services/personas/PersonasServices";
import PerfilItem from "./components/PerfilItem";
import LayoutBase from "../common/LayoutBase";

export default function PerfilView() {
    const [persona, setPersona] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useLocation();

    const handleConfirm = () => {
        console.log("Saliendo de la sesión");
        auth.logout();
        setLocation("/login");
    }

    useEffect(() => {
        const fetchPerfil = async () => {
            const persona_id = auth.getUserID();
            
            if (!persona_id) {
                setError("Usuario no autenticado o ID no encontrado.");
                setLoading(false);
                return;
            }

            try {
                const data = await personasService.obtenerPersonaPorPersonaId(persona_id);
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
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <LayoutBase title="Perfil">
                <Box className="text-center p-8 text-red-600">
                    {error}
                </Box>
            </LayoutBase>
        );
    }
    
    if (!persona) {
        return (
            <LayoutBase title="Perfil">
                <Box className="text-center p-8">
                    Datos de perfil no disponibles.
                </Box>
            </LayoutBase>
        );
    }

    return (
        <LayoutBase title="Perfil"> {/* 🟢 Usar LayoutBase */}
            <div className="bg-[#f5f7f8] p-4 rounded-lg">
                <PerfilItem 
                    label="Hola!!" 
                    value={persona.nombre || 'N/A'}
                />

                <PerfilItem 
                    label="Correo Electrónico" 
                    value={persona.correo || 'N/A'} 
                />
                
                <PerfilItem 
                    label="Equipo" 
                    value={persona.nombre_equipo || 'Sin equipo asignado'} 
                />

                <PerfilItem 
                    label="Documento (DNI)" 
                    value={persona.documento || 'N/A'} 
                />

                {/* 🟢 Botón centrado con mejor estilo */}
                <Box display="flex" justifyContent="center" mt={4}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleConfirm}
                        sx={{
                            padding: '10px 24px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        Cerrar Sesión
                    </Button>
                </Box>
            </div>
        </LayoutBase>
    );
}