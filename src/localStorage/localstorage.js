// Definición de las constantes utilizadas
const TOKEN_KEY = 'authToken';
const ROLE_KEY = 'userRole';

// Lista de roles válidos
const VALID_ROLES = ['Coordinador', 'Capitán', 'Alumno'];

// 1. Funciones de persistencia del estado (Login/Logout)
export const auth = {
    /**
     * Almacena el token y el rol en localStorage.
     * @param {string} token - El token JWT recibido del servidor.
     * @param {string} role - El rol del usuario.
     */
    login: (token, role) => {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(ROLE_KEY, role);
    },

    /**
     * Elimina la información de autenticación de localStorage.
     */
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
    },

    // 2. Funciones de acceso al estado (Usadas por componentes/Axios)
    /**
     * Obtiene el token de localStorage.
     * @returns {string | null} El token o null si no existe.
     */
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    /**
     * Obtiene el rol del usuario de localStorage.
     * @returns {string | null} El rol (Coordinador, Capitán, Alumno) o null si es inválido/no existe.
     */
    getUserRole: () => {
        const role = localStorage.getItem(ROLE_KEY);
        
        // Verifica si el rol es uno de los válidos
        if (role && VALID_ROLES.includes(role)) {
            return role;
        }
        return null;
    },
};

// 3. Función de verificación de roles para la UI
/**
 * Verifica si el rol actual del usuario coincide con alguno de los roles requeridos.
 * @param {string[]} requiredRoles - Un array de roles necesarios para acceder a la funcionalidad.
 * @returns {boolean} True si el usuario tiene un rol permitido, false en caso contrario.
 */
export const hasRequiredRole = (requiredRoles) => {
    const userRole = auth.getUserRole();
    
    if (!userRole) return false;
    
    // Devuelve true si el rol del usuario está incluido en los roles requeridos
    return requiredRoles.includes(userRole);
};