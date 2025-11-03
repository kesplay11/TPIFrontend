// src/services/categorias/CategoriasService.jsx
import axiosInstance from "../../axiosInstance/axiosInstance";

class CategoriasService {
  // 🔹 Crear nueva categoría
  async crearCategoria(nombre) {
    try {
      const response = await axiosInstance.post("/api/categorias", { nombre });
      return response.data;
    } catch (error) {
      console.error("Error al crear categoría:", error);
      throw error;
    }
  }

  // 🔹 Obtener todas las categorías (puede incluir borradas con ?borrado=1)
  async obtenerCategorias(borrado = 0) {
    try {
      const response = await axiosInstance.get("/api/categorias", {
        params: { borrado },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  }

  // 🔹 Actualizar nombre de una categoría
  async actualizarCategoria(categoria_id, nombre) {
    try {
      const response = await axiosInstance.put(`/api/categorias/${categoria_id}`, {
        nombre,
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      throw error;
    }
  }

  // 🔹 Cambiar estado (borrado lógico o reactivar)
  async cambiarEstado(categoria_id, borrado_logico) {
    try {
      const response = await axiosInstance.put(`/api/categorias/estado/${categoria_id}`, {
        borrado_logico,
      });
      return response.data;
    } catch (error) {
      console.error("Error al cambiar estado de categoría:", error);
      throw error;
    }
  }
}

// Exporta una instancia única del servicio
const categoriasService = new CategoriasService();
export default categoriasService;
