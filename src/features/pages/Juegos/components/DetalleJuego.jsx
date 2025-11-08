import { useState, useEffect } from "react";
// Asume que este servicio tiene métodos para todas las rutas que mencionaste
import JuegosService from '../../../../services/juegos/JuegosService'; 
import RondasEquiposService from '../../../../services/rondasEquipos/RondasEquiposService';
import JuegosRondasService from '../../../../services/juegosRondas/JuegosRondasService';
import PuntosService from '../../../../services/puntos/PuntosService';
import EstadoBadge from "./TextEstado"; // Componente para mostrar el estado de la ronda

export default function DetalleJuego({ juegoId }) {
    const [rondas, setRondas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetalleCompleto = async () => {
            setLoading(true);
            setError(null);

            try {
                // 1. Obtener las Rondas Activas del juego
                const rondasData = await JuegosRondasService.obtenerRondasActivasPorJuego(juegoId);

                // 2. Por cada ronda, obtener sus Equipos y Puntos
                const rondasConDetalle = await Promise.all(
                    rondasData.map(async (ronda) => {
                        const rondaId = ronda.juego_ronda_id;

                        // Llamada 2: Obtener Equipos por Ronda
                        const equiposData = await RondasEquiposService.obtenerEquiposPorRonda(rondaId);
                        console.log(equiposData);

                        // Llamada 3: Obtener Puntos por Ronda
                        const puntosData = await PuntosService.obtenerPuntos(rondaId);
                        console.log(puntosData);

                        // Mapear y consolidar puntos a cada equipo
                        const equiposConPuntos = equiposData.map(equipo => {
                            const puntoEncontrado = puntosData.find(
                                punto => punto.equipo_id === equipo.equipo_id
                            );
                            
                            // Devolvemos el equipo con su puntaje, si no tiene, es 0
                            return {
                                ...equipo,
                                puntos: puntoEncontrado ? puntoEncontrado.puntos : 0 
                            };
                        });

                        // Devolvemos la ronda con toda la información consolidada
                        return {
                            ...ronda,
                            equipos: equiposConPuntos
                        };
                    })
                );

                setRondas(rondasConDetalle);
            } catch (err) {
                console.error("Error al cargar el detalle completo del juego:", err);
                setError("Error al cargar los datos de las rondas y equipos.");
            } finally {
                setLoading(false);
            }
        };

        if (juegoId) {
            fetchDetalleCompleto();
        }
    }, [juegoId]);


    // --- Renderizado Condicional ---
    if (loading) return <div className="p-4 bg-gray-100 m-2 text-center">Cargando rondas y detalles...</div>;
    if (error) return <div className="p-4 bg-red-100 m-2 text-center text-red-700">❌ {error}</div>;
    if (rondas.length === 0) return <div className="p-4 bg-yellow-100 m-2 text-center text-yellow-700">No hay rondas activas.</div>;

    // --- Renderizado del Acordeón Desplegado ---
    return (
        <div className="bg-white/80 dark:bg-white/5 rounded-b-lg p-4 transition-all -mt-3 shadow-inner space-y-4">
            {rondas.map((ronda) => (
                <div key={ronda.juego_ronda_id} className="border p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    
                    {/* 1. CABECERA DE LA RONDA */}
                    <div className="flex justify-between items-center mb-3 border-b pb-2 border-gray-200 dark:border-gray-600">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Ronda {ronda.numero_ronda}
                        </h4>
                        <EstadoBadge estado={ronda.nombre_estado_ronda} />
                    </div>

                    {/* 2. LISTADO DE EQUIPOS Y PUNTOS */}
                    <div className="space-y-3">
                        {/* Como pueden ser N equipos, los mostramos en una lista flexible */}
                        {ronda.equipos.map(equipo => (
                            <div key={equipo.equipo_id} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-base font-bold">
                                        {equipo.nombre_equipo[0].toUpperCase()}
                                    </div>
                                    <span className="font-medium text-black/80 dark:text-white/80 text-base">
                                        {equipo.nombre_equipo}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-base font-bold text-black/90 dark:text-white/90">
                                        {equipo.puntos}
                                    </p>
                                    <p className="text-sm text-black/50 dark:text-white/50">Puntos</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}