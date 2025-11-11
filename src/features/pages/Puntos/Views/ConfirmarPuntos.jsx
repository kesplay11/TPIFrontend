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
            setPuntos(prev => prev.filter(p => p.punto_id !== punto_id)); // quita el punto confirmado/rechazado
        } catch (err) {
            console.error("Error al actualizar estado:", err);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (puntos.length === 0) return <div>No hay puntos pendientes.</div>;

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Confirmar Puntos Pendientes</h2>
            {puntos.map(p => (
                <div key={p.punto_id} className="border rounded-lg p-3 flex justify-between items-center">
                    <div>
                        <p><strong>Equipo:</strong> {p.nombre_equipo}</p>
                        <p><strong>Juego:</strong> {p.nombre_categoria}</p>
                        <p><strong>Ronda:</strong> {p.numero_ronda}</p>
                        <p><strong>Puntos:</strong> {p.puntos}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            variant="contained" 
                            color="success" 
                            onClick={() => manejarCambioEstado(p.punto_id, 2)}
                        >
                            Confirmar
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="error" 
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
