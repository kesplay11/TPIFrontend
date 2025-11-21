// src/services/equipos/EquiposService.jsx
import axiosInstance from "../../axiosInstance/axiosInstance";

class EquiposService {
// 🔹 Crear nuevo equipo
async crearEquipo(nombre) {
    try {
    const response = await axiosInstance.post("/api/equipos", { nombre });
    return response.data;
    } catch (error) {
    console.error("Error al crear equipo:", error);
    throw error;
    }
}

// 🔹 Obtener equipos (activos o borrados)
async obtenerEquipos(borrado = 0) {
    try {
    const response = await axiosInstance.get("/api/equipos", {
        params: { borrado },
    });
    return response.data;
    } catch (error) {
    console.error("Error al obtener equipos:", error);
    throw error;
    }
}

// 🔹 Actualizar equipo por ID
async actualizarEquipo(equipo_id, nombre) {
    try {
    const response = await axiosInstance.put(`/api/equipos/${equipo_id}`, {
        nombre,
    });
    return response.data;
    } catch (error) {
    console.error("Error al actualizar equipo:", error);
    throw error;
    }
}

// 🔹 Cambiar estado (borrado lógico / reactivar)
async cambiarEstado(equipo_id, borrado_logico) {
    try {
    const response = await axiosInstance.put(`/api/equipos/estado/${equipo_id}`, {
        borrado_logico,
    });
    return response.data;
    } catch (error) {
    console.error("Error al cambiar estado del equipo:", error);
    throw error;
    }
}

async obtenerEquipoPorId(equipo_id){
    try{
        const response = await axiosInstance.get(`/api/equipos/${equipo_id}`)
        return response.data[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}
}

// Exportar instancia única
const equiposService = new EquiposService();
export default equiposService;
