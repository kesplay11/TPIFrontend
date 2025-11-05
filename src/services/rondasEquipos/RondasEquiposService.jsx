import axiosInstance from "../../axiosInstance/axiosInstance";

class RondasEquiposService {
    /**
     * 🔹 Obtiene la lista de equipos participantes (con nombres) para una ronda de juego específica.
     * Corresponde a la ruta GET /api/rondasEquipos/rondas/:juego_ronda_id/equipos
     * * @param {number} juego_ronda_id - El ID de la ronda de juego.
     * @returns {Promise<Array<{ronda_equipo_id: number, equipo_id: number, nombre_equipo: string}>>}
     */
    async obtenerEquiposPorRonda(juego_ronda_id) {
        try {
            // Se utiliza el endpoint /rondas/:juego_ronda_id/equipos
            const response = await axiosInstance.get(`/api/rondasEquipos/rondas/${juego_ronda_id}/equipos`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener equipos para la ronda ${juego_ronda_id}:`, error);
            // Propagar el error para que el componente frontend lo maneje
            throw error;
        }
    }
}

// Exportar una única instancia del servicio
const rondasEquiposService = new RondasEquiposService();
export default rondasEquiposService;