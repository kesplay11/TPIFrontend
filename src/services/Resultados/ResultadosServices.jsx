import axiosInstance from "../../axiosInstance/axiosInstance";

class ResultadosService {
  /**
   * 🟢 Obtener resultados de equipos con puntos totales
   * @param {number} estado_juego_id - ID del estado del juego (por defecto 3 = finalizado)
   * @returns {Promise<Array>} Lista de equipos con sus puntos acumulados
   */
  async obtenerResultados(estado_juego_id = 3) {
    try {
      const res = await axiosInstance.get("/resultados", {
        params: { estado_juego_id },
      });
      return res.data;
    } catch (error) {
      console.error("Error al obtener los resultados:", error);
      throw error;
    }
  }
}

export default new ResultadosService();
