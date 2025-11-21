import { useEffect, useState } from "react";
import JuegosRondasService from '../../../../services/juegosRondas/JuegosRondasService';
import RondasEquiposService from '../../../../services/rondasEquipos/RondasEquiposService';
import CardRondaEditar from "./CardRondaEditar";

export default function DetalleJuegoEditar({ juegoId, onDeleteRonda }) {
    const [rondas, setRondas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetalleCompleto = async () => {
            setLoading(true);
            setError(null);

            try {
                // 1️⃣ Traemos las rondas activas (igual que en DetalleJuego)
                const rondasData = await JuegosRondasService.obtenerRondasActivasPorJuego(juegoId);
                console.log("rondasData", rondasData);

                const rondasConDetalle = await Promise.all(
                    rondasData.map(async (ronda) => {
                        // 2️⃣ Traemos todos los equipos de la ronda
                        const equiposData = await RondasEquiposService.obtenerEquiposPorRonda(ronda.juego_ronda_id);
                        console.log("equiposData", equiposData);

                        return {
                            ...ronda,
                            equipos: equiposData
                        };
                    })
                );

                setRondas(rondasConDetalle);
            } catch (err) {
                console.error(err);
                setError("Error al cargar las rondas y equipos.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetalleCompleto();
    }, [juegoId]);

    if (loading) return <div className="p-4 text-gray-600">Cargando rondas...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;
    if (rondas.length === 0) return <div className="p-4 text-gray-600">No hay rondas activas.</div>;

    return (
        <div className="bg-white/80 dark:bg-white/5 rounded-b-lg p-4 -mt-3 shadow-inner space-y-4">
            {rondas.map((ronda, idx) => (
                <CardRondaEditar
                    key={ronda.juego_ronda_id || idx}
                    ronda={ronda}
                    equipos={Array.isArray(ronda.equipos) ? ronda.equipos : []}
                    numero={idx + 1}
                    onDeleteRonda={onDeleteRonda}
                />
            ))}
        </div>
    );
}