// src/services/puntos/PuntosService.jsx
import axiosInstance from "../../axiosInstance/axiosInstance";

class PuntosService {
// 🔹 Crear un nuevo registro de puntos
async crearPunto(equipo_id, juego_ronda_id, capitan_id, puntos, fecha_de_creacion) {
    try {
    const response = await axiosInstance.post("/api/puntos", {
        equipo_id,
        juego_ronda_id,
        capitan_id,
        puntos,
        fecha_de_creacion,
    });
    return response.data;
    } catch (error) {
    console.error("Error al crear punto:", error);
    throw error;
    }
}

// 🔹 Obtener todos los puntos (con filtro opcional de búsqueda)
async obtenerPuntos(busqueda = "") {
    try {
    const response = await axiosInstance.get("/api/puntos", {
        params: { busqueda },
    });
    return response.data;
    } catch (error) {
    console.error("Error al obtener puntos:", error);
    throw error;
    }
}

// 🔹 Actualizar cantidad de puntos (por coordinador o capitán)
async actualizarPuntos(punto_id, puntos) {
    try {
    const response = await axiosInstance.put(`/api/puntos/${punto_id}`, { puntos });
    return response.data;
    } catch (error) {
    console.error("Error al actualizar puntos:", error);
    throw error;
    }
}

// 🔹 Cambiar el estado del punto (pendiente, confirmado, rechazado)
async cambiarEstado(punto_id, estado_punto_id) {
    try {
    const response = await axiosInstance.put(`/api/puntos/estado/${punto_id}`, {
        estado_punto_id,
    });
    return response.data;
    } catch (error) {
    console.error("Error al cambiar estado del punto:", error);
    throw error;
    }
}

async obtenerPuntosPorRonda(ronda_id) {
    try {
    const response = await axiosInstance.get(`/api/puntos/${ronda_id}`, {
    });
    return response.data;
    } catch (error) {
    console.error("Error al obtener puntos:", error);
    throw error;
    }
}
}


// Exportar una única instancia
const puntosService = new PuntosService();
export default puntosService;
