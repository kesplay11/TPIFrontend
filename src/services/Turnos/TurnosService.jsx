import axiosInstance from "../../axiosInstance/axiosInstance";
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
async obtenerTurnos(borrado = 0) {
    try {
    const res = await axiosInstance.get("/api/turnos", { 
        params: { borrado } 
    });
    return res.data;
    } catch (error) {
    console.error("Error al obtener turnos:", error);
    throw error;
    }
}

async obtenerTurnoPorId(turno_id){
    try{
        const response = await axiosInstance.get(`/api/turnos/${turno_id}`)
        console.log(response.data[0])
        return response.data[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// 🟠 Actualizar turno por ID
async actualizarTurno(turno_id, data) { 
    try {
    const res = await axiosInstance.put(`/api/turnos/${turno_id}`, data);
    return res.data;
    } catch (error) {
    console.error("Error al actualizar turno:", error);
    throw error;
    }
}

// 🔴 Cambiar estado lógico (borrar / reactivar)
async cambiarEstado(turno_id, borrado_logico) {
    try {
    const res = await axiosInstance.put(`/api/turnos/estado/${turno_id}`, {
        borrado_logico,
    });
    return res.data;
    } catch (error) {
    console.error("Error al cambiar estado del turno:", error);
    throw error;
    }
}
}

const turnoService = new TurnosService();
export default turnoService;
