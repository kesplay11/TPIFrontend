// src/services/LoginService.js
import axiosInstance from "../../axiosInstance/axiosInstance";
import { auth } from "../../localStorage/localstorage";

class LoginService {
async login(email, password) {
    try {
    const response = await axiosInstance.post("/api/public/login", {
  correo: email,     // 👈 debe llamarse igual que en el backend
  pass: password     // 👈 debe llamarse igual que en el backend
    });

    const { token, role } = response.data;

    // Guarda token y rol en el localStorage
    auth.login(token, role);

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
