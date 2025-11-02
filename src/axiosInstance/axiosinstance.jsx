import axios from 'axios';
import { auth } from '../localStorage/localstorage';
// 1. Crea una instancia de Axios
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000" // Puedes mover el baseUrl aquí
});

// 2. Configura el Interceptor de Solicitudes
axiosInstance.interceptors.request.use(
    (config) => {
        const token = auth.getToken();
        
        // Si existe un token, lo adjunta al header de Autorización (Bearer)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Configura el Interceptor de Respuestas (Manejo de Errores 401/403)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                console.error("Token expirado o no válido. Redirigiendo a Login.");
                auth.logout();
                // Aquí deberías agregar la lógica de redirección a /login
                // window.location.href = '/login'; 
            } else if (status === 403) {
                 console.error("Acceso denegado (403). El rol no tiene permiso para este recurso.");
                 // Muestra una notificación al usuario
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;