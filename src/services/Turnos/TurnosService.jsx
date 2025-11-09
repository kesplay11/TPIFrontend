import axiosInstance from "../axiosInstance";

class TurnosService {
// 🟢 Crear turno
async crearTurno(data) {
    try {
    const res = await axiosInstance.post("/api/turnos", data);
    return res.data;
    } catch (error) {
    console.error("Error al crear turno:", error);
    throw error;
    }
}

// 🔵 Obtener todos los turnos (con filtro opcional)
async obtenerTurnos(busqueda = "") {
    try {
    const params = busqueda ? { busqueda } : {};
    const res = await axiosInstance.get("/api/turnos", { params });
    return res.data;
    } catch (error) {
    console.error("Error al obtener turnos:", error);
    throw error;
    }
}

// 🟠 Actualizar turno por ID
async actualizarTurno(turno_id, data) {
    try {
    const res = await axiosInstance.put(`/turnos/${turno_id}`, data);
    return res.data;
    } catch (error) {
    console.error("Error al actualizar turno:", error);
    throw error;
    }
}

// 🔴 Cambiar estado lógico (borrar / reactivar)
async cambiarEstado(turno_id, borrado_logico) {
    try {
    const res = await axiosInstance.put(`/turnos/estado/${turno_id}`, {
        borrado_logico,
    });
    return res.data;
    } catch (error) {
    console.error("Error al cambiar estado del turno:", error);
    throw error;
    }
}
}

export default new TurnosService();
