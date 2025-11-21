import axiosInstance from "../../axiosInstance/axiosInstance";

class PersonasService {
    async crearPersonaConMail(data) {
        try {
            const response = await axiosInstance.post("/api/personas/mail", data);
            return response.data;
        } catch (error) {
            console.error("Error al crear persona con envío de correo:", error);
            throw error;
        }
    }

    // 🔹 Verificar si una persona existe por DNI - GET /api/personas/verificar/:dni
    async verificarDNI(dni) {
        try {
            const response = await axiosInstance.get(`/api/personas/verificar/${dni}`);
            return response.data;
        } catch (error) {
            console.error("Error al verificar DNI:", error);
            throw error;
        }
    }

    // 🔹 Obtener todas las personas (con filtro opcional) - GET /api/personas?busqueda=...
    async obtenerPersonas(busqueda = "") {
        try {
            const response = await axiosInstance.get("/api/personas", {
                params: { busqueda },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener personas:", error);
            throw error;
        }
    }

    // 🔹 Obtener persona por ID - GET /api/personas/:persona_id
    async obtenerPersonaPorPersonaId(persona_id) {
        try {
            const response = await axiosInstance.get(`/api/personas/${persona_id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener persona por ID:", error);
            throw error;
        }
    }

    // 🔹 Actualizar datos de una persona - PUT /api/personas/:persona_id
    async actualizarPersona(persona_id, data) {
        try {
            const response = await axiosInstance.put(`/api/personas/${persona_id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar persona:", error);
            throw error;
        }
    }

    // 🔹 Cambiar estado (borrado lógico o reactivar) - PUT /api/personas/estado/:persona_id
    async cambiarEstado(persona_id, borrado_logico) {
        try {
            const response = await axiosInstance.put(`/api/personas/estado/${persona_id}`, {
                borrado_logico,
            });
            return response.data;
        } catch (error) {
            console.error("Error al cambiar estado de persona:", error);
            throw error;
        }
    }

    async cambiarEstadoPorDni(documento, borrado_logico) {
        try {
            const response = await axiosInstance.put(`/api/personas/estado/dni/${documento}`, {
                borrado_logico,
            });
            return response.data;
        } catch (error) {
            console.error("Error al cambiar estado de persona:", error);
            throw error;
        }
    }

    // 🔹 Establecer contraseña (set-password) - PUT /api/personas/:persona_id/set-password
    // Recibe el persona_id como argumento para ser un servicio independiente de la autenticación local.
    async setPassword(persona_id, nuevaPass) {
        if (!persona_id) {
            throw new Error("ID de persona es obligatorio para cambiar la contraseña.");
        }
        try {
            const response = await axiosInstance.put(`/api/personas/${persona_id}/set-password`, 
                { pass: nuevaPass }
            );
            return response.data;
        } catch (error) {
            console.error("Error al establecer contraseña:", error);
            throw error;
        }
    }
}

// Exporta una instancia única del servicio
const personasService = new PersonasService();
export default personasService;