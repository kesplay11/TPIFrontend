import { useState, useEffect } from "react";
import CardJuego from "./components/CardJuego";
import DetalleJuego from "./components/DetalleJuego";
import JuegosService from '../../../services/juegos/JuegosService'
import { auth } from "../../../localStorage/localstorage";
import { Box, Typography, CircularProgress, Divider } from "@mui/material";
/**
 * Componente para visualizar un juego en una lista, ahora con funcionalidad de clic.
 * * @param {object} props - Propiedades del componente
 * @param {string} props.nombre - Nombre del juego.
 * @param {string} props.estado - Estado actual del juego (ej: 'pendiente', 'en-proceso').
 * @param {number|string} props.turno - Número o descripción del turno.
 * @param {function} props.onClickAction - Función a ejecutar cuando se hace clic en la tarjeta.
 * @returns {JSX.Element}
 */

    
export default function JuegosView({ nombre, estado, turno, onClickAction }) {
    // Definimos el estado del componente (opcional) si deseas manejar un clic interno, 
    // pero para ejecutar una acción externa, solo necesitamos la prop 'onClickAction'.

    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [openCardId, setOpenCardId] = useState(null);

    const handleCardClick = (juegoId) => {
        setOpenCardId(prevId => {
            return prevId === juegoId ? null : juegoId;
        })
    }

    useEffect(() => {
        const role = auth.getUserRole();
        console.log("estamos dentro del useEffect", role);
        const fetchJuego = async () => {
            let data = [];
            setLoading(true);
            try {
                //1. Llama al servicio con el ID obtenido
                if(role === "alumno"){
                    data = await JuegosService.obtenerJuegosVisibles();
                    console.log(data);
                    console.log("El rol es alumno", role)
                }
                if(role === "coordinador" || role === "capitan"){
                    data = await JuegosService.obtenerTodosLosJuegos();
                    console.log(data);
                    console.log("El rol es capitan o coordinador", role)
                }

                setJuegos(data);
            } catch (err) {
                setError("No se pudieron cargar los datos de los juegos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJuego();
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
    return (
        <div>
                  <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark sticky top-0 z-10 border-b border-primary/20 dark:border-primary/30">
        <h2 className="text-xl font-bold text-black dark:text-white flex-1 text-center">
          Juegos
        </h2>
      </header>
            {juegos.map((item) => (
                // Usamos un div como contenedor para la tarjeta y su detalle (el acordeón)
                <div key={item.juego_id}> 
                    <CardJuego 
                        // Props necesarias para la vista
                        juego_id={item.juego_id}
                        nombre_categoria={item.nombre_categoria}
                        nombre_estado={item.nombre_estado}
                        nombre_turno={item.nombre_turno}
                        
                        // 3. Pasamos la función de manejo de clic
                        onClickAction={handleCardClick} 
                        
                        // 4. Indicamos si esta tarjeta debe estar abierta
                        isOpen={openCardId === item.juego_id} 
                    />
                    
                    {/* 5. Renderizado Condicional del Detalle (Carga perezosa) */}
                    {/* Solo se monta DetalleJuego si su ID coincide con openCardId */}
                    {openCardId === item.juego_id && (
                        <DetalleJuego juegoId={item.juego_id} />
                    )}
                </div>
            ))}
        </div>
    );
}

