// src/pages/PerfilView.jsx

import { useState, useEffect } from "react";
import { Typography, Card, Box, Divider, CircularProgress } from "@mui/material";
import { auth } from "../../../localStorage/localstorage";
import personasService from "../../../services/personas/PersonasServices"; // Asegúrate de que esta ruta sea correcta
import PerfilItem from "./components/PerfilItem";
import EstadoBadge from "../Juegos/components/TextEstado";

// Simulación del módulo auth para pruebas (generalmente proviene de localStorage)

const mockAuth = {
    getUserId: () =>  12345, // ID simulado
    getUserRole: () => 'Coordinador', // Rol simulado
    // Puedes agregar más funciones si son necesarias, como `getUserToken`
};

// Simulación del objeto 'persona' que el backend devolvería
const mockPersonaData = {
    // Los campos deben coincidir con lo que esperas en el componente (persona.nombre, persona.equipo, etc.)
    nombre: "Juan Pérez García",
    documento: "12.345.678-9",
    correo: "juan.perez@empresa.com",
    equipo: "Operaciones Centrales", // O un ID de equipo si el backend no lo resuelve
    // Otros campos que podrían existir pero no se muestran:
    fecha_nacimiento: "1985-06-15",
    estado_activo: true,
};

// --- Ejemplo de uso en el componente con datos simulados ---

/*
// Dentro del PerfilView.jsx, podrías simular los estados así para un test rápido:

export default function PerfilView() {
    const [persona, setPersona] = useState(mockPersonaData); // Usar el mock aquí
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ... El resto del código del componente ...
}
*/

// Componente presentacional para cada detalle


 export default function PerfilView() {
    const [persona, setPersona] = useState(mockPersonaData);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPerfil = async () => {
//             const persona_id = mockAuth.getUserId(); // Obtiene el ID del token
            
//             if (!persona_id) {
//                 setError("Usuario no autenticado o ID no encontrado.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 // 1. Llama al servicio con el ID obtenido
//                 // const data = await personasService.obtenerPersonaPorPersonaId(persona_id);
                
//                 // // Si el backend devuelve un array (aunque sea de 1), ajusta.
//                 // const perfilData = Array.isArray(data) ? data[0] : data; 

//                 // setPersona(mockPersonaData);
//             } catch (err) {
//                 setError("No se pudieron cargar los datos del perfil.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // fetchPerfil();
//     }, []); // El array vacío asegura que se ejecute solo al montar

    // --- Manejo de Estados de Renderizado ---
    
    // if (loading) {
    //     return (
    //         <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
    //             <CircularProgress />
    //         </Box>
    //     );
    // }

    // if (error) {
    //     return (
    //         <Typography color="error" variant="h6" className="text-center p-8">
    //             {error}
    //         </Typography>
    //     );
    // }
    
    // // Si la persona es null o undefined por un error no capturado.
    // if (!persona) {
    //      return (
    //         <Typography variant="h6" className="text-center p-8">
    //             Datos de perfil no disponibles.
    //         </Typography>
    //     );
    // }
    
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