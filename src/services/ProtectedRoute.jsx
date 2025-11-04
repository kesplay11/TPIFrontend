// src/components/ProtectedRoute.jsx
import { Route, Redirect } from "wouter";
import { auth, hasRequiredRole } from "../localStorage/localstorage"
/**
 * Componente de Ruta Protegida. 
 * Verifica autenticación y rol antes de renderizar la vista.
 * @param {React.Component} component - Componente a renderizar si el acceso es permitido.
 * @param {string} path - Ruta de Wouter.
 * @param {string[]} requiredRoles - Roles permitidos (ej: ['Coordinador']).
 */
const ProtectedRoute = ({ component: Component, path, requiredRoles = [], isSetPasswordRoute = false, ...rest }) => {
    const isAuthenticated = !!auth.getToken();
    const isAuthorized = hasRequiredRole(requiredRoles);
    const isFirstLogin = auth.getIsFirstLogin();
    
    // 1. Si no está autenticado, redirige al Login
    if (!isAuthenticated) {
        // Redirige al login. Puedes guardar el 'path' original en LocalStorage para volver después.
        return <Redirect to="/login" />;
    }

    if (isSetPasswordRoute) {
        if(isFirstLogin === false){
            const userRole = auth.getUserRole();
            let redirectPath = "/";
            switch (userRole){
                case 'coordinador': redirectPath = "/coordinador/dashboard"; break;
                case 'capitan': redirectPath = "/capitan/dashboard"; break;
                case 'alumno': redirectPath = "/alumno/dahsboard"; break;
            }
            console.warn("Redirigiendo: contraseña ya configurada.");
            return <Redirect to={redirectPath} />
        }
    }
    
    // 2. Si está autenticado, pero NO autorizado (no tiene el rol requerido)
    if (requiredRoles.length > 0 && !isAuthorized) {
        // Redirige a una ruta por defecto o a un 403 (Acceso Denegado)
        
        // Obtenemos el rol actual para redirigir al dashboard que sí le corresponde.
        const userRole = auth.getUserRole();
        
        let redirectPath = "/login"; // Fallback
        
        // Lógica de redirección de emergencia para roles válidos
        switch (userRole) {
            case 'coordinador':
                redirectPath = "/coordinador/dashboard";
                break;
            case 'capitan':
                redirectPath = "/capitan/dashboard";
                break;
            case 'alumno':
                redirectPath = "/alumno/dashboard";
                break;
            // Si el rol es válido pero intenta acceder a otra ruta, lo enviamos a su dashboard.
        }
        
        console.warn(`Acceso denegado. Rol: ${userRole} intentó acceder a ${path}`);
        return <Redirect to={redirectPath} />; 
    }

    // 3. Si está autenticado Y autorizado, renderiza el componente
    return <Route path={path} component={Component} {...rest} />;
};

export default ProtectedRoute;