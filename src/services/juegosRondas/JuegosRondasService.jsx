import axiosInstance from "../../axiosInstance/axiosInstance";

class JuegosRondasService {
    /**
     * 🔹 Obtiene todas las rondas activas (borrado_logico = 0) de un juego específico.
     * Corresponde a la ruta GET /api/juegosRondas/:juego_id/rondas/activas
     * @param {number} juego_id - El ID del juego padre.
     * @returns {Promise<Array<{juego_ronda_id: number, numero_ronda: number, nombre_estado_ronda: string}>>}
     */
    async obtenerRondasActivasPorJuego(juego_id) {
        try {
            const response = await axiosInstance.get(`/api/juegosRondas/${juego_id}/rondas/activas`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener rondas activas para juego ${juego_id}:`, error);
            throw error;
        }
    }

    /**
     * 🔹 Obtiene todas las rondas borradas (borrado_logico = 1) de un juego específico.
     * Corresponde a la ruta GET /api/juegosRondas/:juego_id/rondas/borradas
     * @param {number} juego_id - El ID del juego padre.
     * @returns {Promise<Array<{juego_ronda_id: number, numero_ronda: number, nombre_estado_ronda: string}>>}
     */
    async obtenerRondasBorradasPorJuego(juego_id) {
        try {
            const response = await axiosInstance.get(`/api/juegosRondas/${juego_id}/rondas/borradas`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener rondas borradas para juego ${juego_id}:`, error);
            throw error;
        }
    }
}

// Exportar una única instancia del servicio
const juegosRondasService = new JuegosRondasService();
export default juegosRondasService;