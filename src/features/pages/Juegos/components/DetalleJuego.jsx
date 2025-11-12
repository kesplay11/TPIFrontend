import { useState, useEffect } from "react";
import JuegosRondasService from '../../../../services/juegosRondas/JuegosRondasService';
import RondasEquiposService from '../../../../services/rondasEquipos/RondasEquiposService';
import PuntosService from '../../../../services/puntos/PuntosService';
import EstadoBadge from "./TextEstado";
import { useLocation } from "wouter";
import { auth } from "../../../../localStorage/localstorage";
import { Button } from "@mui/material";
import puntosService from "../../../../services/puntos/PuntosService";

export default function DetalleJuego({ juegoId }) {
    const [location, setLocation] = useLocation();
    const [rondas, setRondas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const role = auth.getUserRole();           
    const userTeamId = auth.getUserTeam();     

    useEffect(() => {
        const fetchDetalleCompleto = async () => {
            setLoading(true);
            setError(null);

            try {
                // 1️⃣ Traemos las rondas activas
                const rondasData = await JuegosRondasService.obtenerRondasActivasPorJuego(juegoId);
                console.log("rondasData", rondasData);

                const rondasConDetalle = await Promise.all(
                    rondasData.map(async (ronda) => {
                        // 2️⃣ Traemos todos los equipos de la ronda
                        const equiposData = await RondasEquiposService.obtenerEquiposPorRonda(ronda.juego_ronda_id);
                        console.log("equiposData", equiposData);
                        let rondaN = ronda.juego_ronda_id
                        console.log(rondaN);
                        console.log(ronda.juego_ronda_id);
                        // 3️⃣ Traemos los puntos de la ronda
                        const puntosData = await PuntosService.obtenerPuntosPorRonda(rondaN);
                    
                        console.log("puntosData", puntosData);

                        // 4️⃣ Mapear equipos y asignar puntos
     const equiposConPuntos = equiposData.map(equipo => {
    const puntoEncontrado = puntosData.find(p => p.equipo_id === equipo.equipo_id);
    return {
        ...equipo,
        puntos: puntoEncontrado && puntoEncontrado.puntos != null ? puntoEncontrado.puntos : 0,
        yaCargado: !!(puntoEncontrado && puntoEncontrado.puntos != null) // solo se marca como cargado si tiene puntos reales
    };
});


                        return {
                            ...ronda,
                            equipos: equiposConPuntos
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

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (rondas.length === 0) return <div>No hay rondas activas.</div>;

    return (
        <div className="bg-white/80 dark:bg-white/5 rounded-b-lg p-4 -mt-3 shadow-inner space-y-4">
            {rondas.map(ronda => (
                <div key={ronda.juego_ronda_id} className="border p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex justify-between items-center mb-3 border-b pb-2 border-gray-200 dark:border-gray-600">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Ronda {ronda.numero_ronda}</h4>
                        <EstadoBadge estado={ronda.nombre_estado_ronda} />
                    </div>

                    <div className="space-y-3">
                        {ronda.equipos.map(equipo => (
                            <div key={equipo.equipo_id} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-base font-bold">
                                        {equipo.nombre_equipo[0]?.toUpperCase()}
                                    </div>
                                    <span className="font-medium text-black/80 dark:text-white/80">{equipo.nombre_equipo}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="text-base font-bold text-black/90 dark:text-white/90">{equipo.puntos}</p>
                                    <p className="text-sm text-black/50 dark:text-white/50">Puntos</p>

                                    {(role === 'capitan' || role === 'coordinador') &&
                                    equipo.nombre_equipo === userTeamId &&
                                    ronda.nombre_estado_ronda === 'en-proceso' &&
                                    !equipo.yaCargado && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => setLocation(`/dashboard/puntos/${juegoId}/rondas/${ronda.juego_ronda_id}/cargar-puntos`)}
                                        >
                                            Cargar Puntos
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
