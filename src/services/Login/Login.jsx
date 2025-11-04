// src/services/LoginService.js
import axiosInstance from "../../axiosInstance/axiosInstance";
import { auth } from "../../localStorage/localstorage";

const mapRoleIdToRoleName = (rol_id) => {
    switch (rol_id) {
        case 1:
            return 'coordinador';
        case 2:
            return 'capitan';
        case 3:
            return 'alumno';
        default:
            console.error("Rol ID desconocido:", rol_id);
            return null;
    }
}

class LoginService {
async login(email, password) {
    try {
    const response = await axiosInstance.post("/api/public/login", {
      correo: email,     // 👈 debe llamarse igual que en el backend
      pass: password     // 👈 debe llamarse igual que en el backend
    });

    

    const { token, rol_id, es_primer_login } = response.data;
    
    const roleName = mapRoleIdToRoleName(rol_id);

    console.log(roleName);
    // Guarda token y rol en el localStorage
    auth.login(token, roleName, es_primer_login);

    return response.data;
    } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
    }
}

logout() {
    auth.logout();
}
}

const loginService = new LoginService();
export default loginService;
