import { useEffect, useState } from "react";
import PuntosService from "../../../../services/puntos/PuntosService";
import { Button } from "@mui/material";

export default function ConfirmarPuntos() {
    const [puntos, setPuntos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendientes = async () => {
            try {
                const data = await PuntosService.obtenerPuntos({ estado: "pendiente" });
                setPuntos(data);
            } catch (err) {
                console.error(err);
                setError("Error al cargar los puntos pendientes.");
            } finally {
                setLoading(false);
            }
        };
        fetchPendientes();
    }, []);

    const manejarCambioEstado = async (punto_id, nuevoEstado) => {
        try {
            await PuntosService.cambiarEstado(punto_id, nuevoEstado);
            setPuntos(prev => prev.filter(p => p.punto_id !== punto_id));
        } catch (err) {
            console.error("Error al actualizar estado:", err);
        }
    };

    if (loading) return <div className="text-center text-gray-600">Cargando...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (puntos.length === 0) return <div className="text-center text-gray-600">No hay puntos pendientes.</div>;

    return (
        <div className="p-4 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800">
                Confirmar Puntos Pendientes
            </h2>

            {puntos.map(p => (
                <div
                    key={p.punto_id}
                    className="
                        bg-white rounded-2xl p-5 shadow-sm border border-gray-200
                        hover:shadow-md transition-shadow duration-200
                        flex justify-between items-center
                    "
                >
                    <div className="space-y-1 text-gray-700">
                        <p><span className="font-semibold text-gray-900">Equipo:</span> {p.nombre_equipo}</p>
                        <p><span className="font-semibold text-gray-900">Juego:</span> {p.nombre_categoria}</p>
                        <p><span className="font-semibold text-gray-900">Ronda:</span> {p.numero_ronda}</p>
                        <p><span className="font-semibold text-gray-900">Puntos:</span> {p.puntos}</p>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[130px]">
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                borderRadius: "12px",
                                textTransform: "none",
                                boxShadow: "none",
                                fontWeight: 600,
                            }}
                            onClick={() => manejarCambioEstado(p.punto_id, 2)}
                        >
                            Confirmar
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            fullWidth
                            sx={{
                                borderRadius: "12px",
                                textTransform: "none",
                                fontWeight: 600,
                                borderWidth: "2px",
                            }}
                            onClick={() => manejarCambioEstado(p.punto_id, 3)}
                        >
                            Rechazar
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
