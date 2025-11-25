// src/services/categorias/CategoriasService.jsx
import axiosInstance from "../axiosInstance/axiosInstance";

class EstadosJuegosServices {

  // 🔹 Obtener todas las categorías (puede incluir borradas con ?borrado=1)
    async obtenerEstados() {
        try {
        const response = await axiosInstance.get("/api/estados")
        return response.data;
        } catch (error) {
        console.error("Error al obtener categorías:", error);
        throw error;
        }
    }
}

// Exporta una instancia única del servicio
const estadosJuegosServices = new EstadosJuegosServices();
export default estadosJuegosServices;
