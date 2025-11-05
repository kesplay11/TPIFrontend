import { Route, Redirect } from "wouter";
import { auth, hasRequiredRole } from "../localStorage/localstorage"
/**
 * Componente de Ruta Protegida. 
 * Aplica lógica de autenticación y de 'primer login' de forma centralizada, 
 * sin depender de rutas específicas por rol.
 * * @param {React.Component} component - Componente a renderizar si el acceso es permitido.
 * @param {string} path - Ruta de Wouter.
 * @param {string[]} requiredRoles - Roles permitidos (usado solo para rutas internas no navegables por la barra).
 * @param {boolean} isSetPasswordRoute - True si esta ruta es /crear-contrasena.
 */
const ProtectedRoute = ({ component: Component, path, requiredRoles = [], isSetPasswordRoute = false, ...rest }) => {
    const isAuthenticated = !!auth.getToken();
    const isFirstLogin = auth.getIsFirstLogin();
    
    // 1. Si no está autenticado, redirige al Login
    if (!isAuthenticated) {
        console.warn("Redirigiendo: No autenticado.");
        return <Redirect to="/login" />;
    }

    // 2. Primer Login: Si es el primer login Y el usuario NO está en la ruta de creación de contraseña,
    // lo forzamos a ir a crear la contraseña.
    if (isFirstLogin && !isSetPasswordRoute) {
        console.warn("Redirigiendo: Se requiere crear contraseña.");
        return <Redirect to="/crear-contrasena" />;
    }

    // 3. Contraseña ya establecida: Si intentan acceder a /crear-contrasena, pero ya la configuraron,
    // los enviamos directamente al Dashboard único.
    if (isSetPasswordRoute && !isFirstLogin) {
        console.warn("Redirigiendo: Contraseña ya configurada. Enviando a /dashboard.");
        // Redirigimos a la ruta genérica del dashboard
        return <Redirect to="/dashboard" />;
    }
    
    // 4. Autorización para Rutas Específicas: Si la ruta tiene requerimientos de rol 
    // (típico para rutas internas que no son el dashboard base) y no está autorizado, 
    // lo enviamos al Dashboard único.
    if (requiredRoles.length > 0 && !hasRequiredRole(requiredRoles)) {
        console.warn(`Acceso denegado. Rol: ${auth.getUserRole()} intentó acceder a ${path}. Redirigiendo a /dashboard.`);
        return <Redirect to="/dashboard" />; 
    }

    // 5. Si todo está OK, renderiza el componente
    return <Route path={path} component={Component} {...rest} />;
};

export default ProtectedRoute;