import { useEffect, useState } from "react";
import { 
    Box, 
    CircularProgress, 
    Alert,
    Typography 
} from "@mui/material";
import LayoutSubView from "../../common/LayoutSubView";
import puntosService from "../../../services/puntos/PuntosService";
import useForm from "../../../hooks/useForm";
import PuntosRechazadosList from "../components/PuntosRechazadosList";
import ReenviarPuntoDialog from "../components/ReenviarPuntoDialog";

export default function PuntosRechazadosView() {
    const [puntosRechazados, setPuntosRechazados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [puntoAReenviar, setPuntoAReenviar] = useState(null);
    const [dialogAbierto, setDialogAbierto] = useState(false);
    const [reenviando, setReenviando] = useState(false);
    const [mensajeExito, setMensajeExito] = useState("");

    const { values, errors, handleChange, setValues, validateForm, resetForm } = useForm(
        { nuevosPuntos: "" },
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

    const handleReenviarPunto = async () => {
        if (!validateForm()) return;

        setReenviando(true);
        try {
            await puntosService.actualizarPuntos(
                puntoAReenviar.punto_id, 
                parseInt(values.nuevosPuntos)
            );
            
            setMensajeExito("✅ Punto reenviado correctamente");
            
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
                
                {/* Header Simple - sin componente extra */}
                <div className="text-center">
                    <Typography variant="h4" className="text-gray-900 dark:text-white mb-2">
                        Puntos Rechazados
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
                        Revisa y reenvía los puntos rechazados por los coordinadores
                    </Typography>
                </div>

                {error && (
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                )}

                {/* Estado vacío SIMPLE */}
                {puntosRechazados.length === 0 && !loading && (
                    <Typography 
                        variant="h6" 
                        className="text-center p-8 text-gray-500"
                    >
                        No hay puntos rechazados para mostrar
                    </Typography>
                )}

                {/* Lista de puntos */}
                {puntosRechazados.length > 0 && (
                    <PuntosRechazadosList 
                        puntos={puntosRechazados} 
                        onReenviar={abrirDialogReenviar}
                    />
                )}

                <ReenviarPuntoDialog
                    open={dialogAbierto}
                    onClose={cerrarDialog}
                    punto={puntoAReenviar}
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    reenviando={reenviando}
                    mensajeExito={mensajeExito}
                    onReenviar={handleReenviarPunto}
                />
            </Box>
        </LayoutSubView>
    );
}