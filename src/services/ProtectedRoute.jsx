import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { auth, hasRequiredRole } from "../localStorage/localstorage";

const ProtectedRoute = ({ children, requiredRoles = [], isSetPasswordRoute = false }) => {
  const [, setLocation] = useLocation();
  const [checking, setChecking] = useState(true);

  const isAuthenticated = !!auth.getToken();
  const isFirstLogin = auth.getIsFirstLogin();
  const role = auth.getUserRole();

  useEffect(() => {
    // 🚦 Validación de acceso
    if (!isAuthenticated) {
      console.log(isAuthenticated);
      console.warn("🔒 Redirigiendo: No autenticado → /login");
      setLocation("/login");
      return;
    }

    if (isFirstLogin && !isSetPasswordRoute) {
      console.warn("🔑 Redirigiendo: debe crear contraseña → /crear-contrasena");
      setLocation("/crear-contrasena");
      return;
    }

    if (isSetPasswordRoute && !isFirstLogin) {
      console.warn("🚫 Ya configuró contraseña → /dashboard");
      setLocation("/dashboard");
      return;
    }

    if (requiredRoles.length > 0 && !hasRequiredRole(requiredRoles)) {
      console.warn(`⚙️ Acceso denegado (rol: ${role}) → /dashboard`);
      setLocation("/dashboard");
      return;
    }

    // ✅ Si todo pasa, se termina el chequeo
    setChecking(false);
  }, [
    isAuthenticated,
    isFirstLogin,
    isSetPasswordRoute,
    requiredRoles,
    role,
    setLocation,
  ]);

  // Mientras valida (solo la primera vez)
  if (checking) {
    return null; // O podrías poner un spinner
  }

  // ✅ Todo OK → renderiza sus hijos (que pueden ser rutas anidadas)
  return <>{children}</>;
};

export default ProtectedRoute;
