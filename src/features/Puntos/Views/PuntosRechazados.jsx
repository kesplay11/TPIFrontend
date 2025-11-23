// src/features/pages/Puntos/views/PuntosRechazadosView.jsx
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { 
    Box, 
    Typography, 
    CircularProgress, 
    Card, 
    CardContent, 
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert
} from "@mui/material";
import LayoutSubView from "../../common/LayoutSubView";
import puntosService from "../../../services/puntos/PuntosService";
import useForm from "../../../hooks/useForm";

export default function PuntosRechazadosView() {
    const [, setLocation] = useLocation();
    const [puntosRechazados, setPuntosRechazados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [puntoAReenviar, setPuntoAReenviar] = useState(null);
    const [dialogAbierto, setDialogAbierto] = useState(false);
    const [reenviando, setReenviando] = useState(false);
    const [mensajeExito, setMensajeExito] = useState("");

    // Formulario para reenviar puntos
    const { values, errors, handleChange, setValues, validateForm, resetForm } = useForm(
        {
            nuevosPuntos: ""
        },
        (vals) => {
            const e = {};
            if (!vals.nuevosPuntos) e.nuevosPuntos = "Los puntos son obligatorios";
            else if (isNaN(vals.nuevosPuntos) || parseInt(vals.nuevosPuntos) < 0) {
                e.nuevosPuntos = "Los puntos deben ser un número positivo";
            }
            return e;
        }
    );

    useEffect(() => {
        cargarPuntosRechazados();
    }, []);

    const cargarPuntosRechazados = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await puntosService.obtenerPuntosRechazados();
            setPuntosRechazados(data);
        } catch (err) {
            console.error("Error cargando puntos rechazados:", err);
            setError("No se pudieron cargar los puntos rechazados");
        } finally {
            setLoading(false);
        }
    };

    const abrirDialogReenviar = (punto) => {
        setPuntoAReenviar(punto);
        setValues({ nuevosPuntos: punto.puntos.toString() });
        setDialogAbierto(true);
        setMensajeExito("");
    };

    const cerrarDialog = () => {
        setDialogAbierto(false);
        setPuntoAReenviar(null);
        resetForm();
        setMensajeExito("");
    };

// En PuntosRechazadosView.jsx - opción 1: usar el método existente
const handleReenviarPunto = async () => {
    if (!validateForm()) return;

    setReenviando(true);
    try {
        // ✅ OPCIÓN 1: Usar el método existente actualizarPuntos
        await puntosService.actualizarPuntos(
            puntoAReenviar.punto_id, 
            parseInt(values.nuevosPuntos)
        );
        
        setMensajeExito("✅ Punto reenviado correctamente. Ahora está en estado pendiente.");
        
        setTimeout(() => {
            cargarPuntosRechazados();
            cerrarDialog();
        }, 1500);

    } catch (err) {
        console.error("Error reenviando punto:", err);
        setError(err.response?.data?.message || "Error al reenviar el punto");
    } finally {
        setReenviando(false);
    }
};

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Box className="w-full h-56 flex items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <LayoutSubView title="Puntos Rechazados">
            <Box className="p-6 max-w-4xl mx-auto space-y-6">
                
                {/* Header */}
                <div className="text-center">
                    <Typography variant="h4" className="text-gray-900 dark:text-white mb-2">
                        Puntos Rechazados
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
                        Aquí puedes ver y reenviar los puntos que fueron rechazados por los coordinadores
                    </Typography>
                </div>

                {/* Mensajes de estado */}
                {error && (
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                )}

                {puntosRechazados.length === 0 && !loading && (
                    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500">
                        <CardContent className="text-center py-8">
                            <Typography variant="h6" className="text-yellow-800 dark:text-yellow-200 mb-2">
                                No hay puntos rechazados
                            </Typography>
                            <Typography className="text-yellow-600 dark:text-yellow-300">
                                No se encontraron puntos rechazados para tu equipo.
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                {/* Lista de puntos rechazados */}
                <div className="space-y-4">
                    {puntosRechazados.map((punto) => (
                        <Card key={punto.punto_id} className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500">
                            <CardContent>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Typography variant="h6" className="text-red-800 dark:text-red-200">
                                                {punto.nombre_categoria}
                                            </Typography>
                                            <span className="px-2 py-1 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 text-sm rounded-full">
                                                Rechazado
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                                            <div>
                                                <Typography variant="body2" className="text-red-600 dark:text-red-300 font-medium">
                                                    Ronda
                                                </Typography>
                                                <Typography className="text-red-800 dark:text-red-100">
                                                    {punto.numero_ronda}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="body2" className="text-red-600 dark:text-red-300 font-medium">
                                                    Turno
                                                </Typography>
                                                <Typography className="text-red-800 dark:text-red-100">
                                                    {punto.nombre_turno}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="body2" className="text-red-600 dark:text-red-300 font-medium">
                                                    Puntos Cargados
                                                </Typography>
                                                <Typography className="text-red-800 dark:text-red-100 font-bold">
                                                    {punto.puntos}
                                                </Typography>
                                            </div>
                                        </div>

                                        <Typography variant="body2" className="text-red-600 dark:text-red-300">
                                            <strong>Fecha:</strong> {formatearFecha(punto.fecha_de_creacion)}
                                        </Typography>
                                        <Typography variant="body2" className="text-red-600 dark:text-red-300">
                                            <strong>Capitán:</strong> {punto.nombre_capitan}
                                        </Typography>
                                    </div>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => abrirDialogReenviar(punto)}
                                        className="ml-4 bg-green-600 hover:bg-green-700"
                                    >
                                        Reenviar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Botón volver */}
                {/* <div className="flex justify-center pt-4">
                    <Button
                        variant="outlined"
                        onClick={() => setLocation("/dashboard/juegos")}
                    >
                        Volver a Juegos
                    </Button>
                </div> */}

                {/* Dialog para reenviar puntos */}
                <Dialog open={dialogAbierto} onClose={cerrarDialog} maxWidth="sm" fullWidth>
                    <DialogTitle>
                        Reenviar Puntos Rechazados
                    </DialogTitle>
                    <DialogContent>
                        {mensajeExito ? (
                            <Alert severity="success" className="mb-4">
                                {mensajeExito}
                            </Alert>
                        ) : (
                            <>
                                <Typography variant="body2" className="mb-4 text-gray-600">
                                    Estás reenviando puntos para: <strong>{puntoAReenviar?.nombre_categoria}</strong> - Ronda {puntoAReenviar?.numero_ronda}
                                </Typography>
                                
                                <TextField
                                    label="Nuevos Puntos"
                                    name="nuevosPuntos"
                                    type="number"
                                    value={values.nuevosPuntos}
                                    onChange={handleChange}
                                    error={!!errors.nuevosPuntos}
                                    helperText={errors.nuevosPuntos}
                                    fullWidth
                                    variant="outlined"
                                />
                                
                                <Typography variant="body2" className="mt-2 text-gray-500">
                                    Al reenviar, el punto volverá a estado "Pendiente" para revisión.
                                </Typography>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {!mensajeExito && (
                            <>
                                <Button onClick={cerrarDialog} disabled={reenviando}>
                                    Cancelar
                                </Button>
                                <Button 
                                    onClick={handleReenviarPunto} 
                                    variant="contained"
                                    disabled={reenviando}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {reenviando ? <CircularProgress size={24} /> : "Reenviar Puntos"}
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>
            </Box>
        </LayoutSubView>
    );
}