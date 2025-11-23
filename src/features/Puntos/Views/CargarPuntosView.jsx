// src/features/pages/Puntos/views/CargarPuntosView.jsx
import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Box, Typography, TextField, Button, CircularProgress, Card } from "@mui/material";
import LayoutSubView from "../../common/LayoutSubView";
import useForm from "../../../hooks/useForm";
import puntosService from "../../../services/puntos/PuntosService";
import { auth } from "../../../localStorage/authStorage";
import RondasEquiposService from '../../../services/rondasEquipos/RondasEquiposService';
import juegosService from "../../../services/juegos/JuegosService";
import InformacionRondaCard from "../components/InformacionRondaCard";
import InformacionEquipoCard from "../components/InformacionEquipoCard";

export default function CargarPuntosView() {
    // ✅ RUTA ACTUALIZADA - ahora incluye equipo_id
    const [match, params] = useRoute("/dashboard/puntos/:juego_id/rondas/:ronda_id/equipos/:equipo_id/cargar-puntos");
    const { juego_id, ronda_id, equipo_id } = params;
    const [, setLocation] = useLocation();
    
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [equipos, setEquipos] = useState([]);
    const [serverError, setServerError] = useState("");
    const [rondaInfo, setRondaInfo] = useState(null);
    const [juegoInfo, setJuegoInfo] = useState(null);
    
    // ✅ EQUIPO_SELECCIONADO ahora viene de los parámetros de la ruta
    const equipoSeleccionado = parseInt(equipo_id);

    const role = auth.getUserRole();
    const userTeamId = parseInt(auth.getUserTeamId());

    // UseForm para manejar solo los puntos
    const { values, errors, handleChange, setValues, validateForm } = useForm(
        {
            puntos: '',
        },
        (vals) => {
            const e = {};
            if (!vals.puntos) e.puntos = "Los puntos son obligatorios";
            else if (isNaN(vals.puntos) || parseInt(vals.puntos) < 0) {
                e.puntos = "Los puntos deben ser un número positivo";
            }
            return e;
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true);
                
                // 1. Obtener equipos de la ronda
                const equiposData = await RondasEquiposService.obtenerEquiposPorRonda(ronda_id);
                setEquipos(equiposData);

                // 2. Obtener información de la ronda
                const rondaData = await juegosService.obtenerRondaPorId(ronda_id);
                setRondaInfo(rondaData?.datos_procesados || null);

                // 3. Obtener información del juego
                if (rondaData?.datos_puros?.juego_id) {
                    const juegoData = await juegosService.obtenerDatosParaEditarJuegoPorId(
                        rondaData.datos_puros.juego_id
                    );
                    setJuegoInfo(juegoData?.juego || null);
                }

                // ✅ VERIFICACIÓN DE PERMISOS - ahora con el equipo de la URL
                if (role === 'capitan' && equipoSeleccionado !== userTeamId) {
                    console.log(role);
                    console.log(equipoSeleccionado);
                    console.log(userTeamId);
                    setServerError("No tienes permisos para cargar puntos en este equipo");
                }

            } catch (err) {
                console.error("Error cargando datos:", err);
                setServerError("Error al cargar la información de la ronda");
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [ronda_id, equipoSeleccionado, role, userTeamId]);

    const handleSubmit = async () => {
        if (!validateForm()) return;
        
        // ✅ VERIFICACIÓN ADICIONAL DE PERMISOS
        if (role === 'capitan' && equipoSeleccionado !== userTeamId) {
            setServerError("No tienes permisos para cargar puntos en este equipo");
            return;
        }

        setLoading(true);
        setServerError("");

        try {
            const payload = {
                juego_ronda_id: parseInt(ronda_id),
                equipo_id: equipoSeleccionado, // ✅ Usamos el equipo de la URL
                puntos: parseInt(values.puntos),
            };

            console.log("Enviando payload:", payload);

            await puntosService.crearPunto(payload);
            alert("Puntos cargados correctamente");
            window.history.back();
        } catch (err) {
            console.error("Error completo:", err);
            console.error("Respuesta del servidor:", err.response?.data);
            
            const errorMsg = err.response?.data?.message || 
                           err.response?.data?.mensaje || 
                           err.response?.data?.error ||
                           "Ocurrió un error al cargar los puntos";
            
            setServerError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
       window.history.back();
    };

    if (loadingData) {
        return (
            <Box className="w-full h-56 flex items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    // Encontrar el nombre del equipo seleccionado
    const equipoNombre = equipos.find(e => e.equipo_id === equipoSeleccionado)?.nombre_equipo || "Equipo no encontrado";

    // ✅ VERIFICAR SI EL EQUIPO EXISTE EN LA RONDA
    const equipoEnRonda = equipos.some(e => e.equipo_id === equipoSeleccionado);
    if (!equipoEnRonda && !loadingData) {
        return (
            <LayoutSubView title="Error">
                <Box className="p-6 max-w-2xl mx-auto">
                    <Card className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6">
                        <Typography variant="h5" className="text-red-800 dark:text-red-200 mb-4">
                            Error
                        </Typography>
                        <Typography className="text-red-700 dark:text-red-300">
                            El equipo seleccionado no pertenece a esta ronda o no existe.
                        </Typography>
                        <Button
                            onClick={handleCancel}
                            variant="outlined"
                            className="mt-4"
                        >
                            Volver a Juegos
                        </Button>
                    </Card>
                </Box>
            </LayoutSubView>
        );
    }

    return (
        <LayoutSubView title="Cargar Puntos">
            <Box className="p-6 max-w-2xl mx-auto space-y-6">
                
                {/* Información del Juego y Ronda */}
                <InformacionRondaCard 
                    juegoInfo={juegoInfo} 
                    rondaInfo={rondaInfo} 
                />

                {/* Información del Equipo */}
                <InformacionEquipoCard 
                    equipoNombre={equipoNombre} 
                    role={role} 
                />

                {/* Formulario */}
                <Card className="bg-white dark:bg-black/30 p-6 rounded-2xl shadow-md">
                    <Typography variant="h5" className="mb-6 text-gray-900 dark:text-white">
                        Cargar Puntos para {equipoNombre}
                    </Typography>

                    <Box className="space-y-4">
                        {/* Campo de Puntos */}
                        <TextField
                            label="Puntos *"
                            name="puntos"
                            type="number"
                            value={values.puntos}
                            onChange={handleChange}
                            error={!!errors.puntos}
                            helperText={errors.puntos}
                            fullWidth
                            variant="outlined"
                            placeholder="Ingrese la cantidad de puntos"
                        />

                        {/* Mensaje de error del servidor */}
                        {serverError && (
                            <Box className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                <Typography className="text-red-700 dark:text-red-300 text-sm">
                                    {serverError}
                                </Typography>
                            </Box>
                        )}

                        {/* Botones */}
                        <Box className="flex justify-end gap-3 pt-4">
                            <Button
                                onClick={handleCancel}
                                disabled={loading}
                                variant="outlined"
                                className="px-6 py-2"
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-6 py-2 bg-green-600 hover:bg-green-700"
                            >
                                {loading ? <CircularProgress size={24} /> : "Cargar Puntos"}
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </LayoutSubView>
    );
}