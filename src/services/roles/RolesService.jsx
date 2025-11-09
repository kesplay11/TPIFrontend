import axiosInstance from "../../axiosInstance/axiosInstance";

class RolesService {

// 🔵 Obtener todos los turnos (con filtro opcional)
    async obtenerRoles() {
            try {
            const res = await axiosInstance.get("/api/roles");
            return res.data;
            } catch (error) {
            console.error("Error al obtener turnos:", error);
            throw error;
        }
    }

}
const rolesService = new RolesService();
export default rolesService;
