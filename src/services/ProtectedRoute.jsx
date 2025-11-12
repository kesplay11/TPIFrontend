import { useEffect } from "react";
import { useLocation } from "wouter";
import { auth, hasRequiredRole } from "../localStorage/localstorage";

const ProtectedRoute = ({ children, requiredRoles = [], isSetPasswordRoute = false }) => {
  const [, setLocation] = useLocation();

  const isAuthenticated = !!auth.getToken();
  const isFirstLogin = auth.getIsFirstLogin();
  const role = auth.getUserRole();

  useEffect(() => {
    // 🔒 1️⃣ No autenticado → /login
    if (!isAuthenticated) {
      console.warn("Redirigiendo: No autenticado.");
      setLocation("/login");
      return;
    }

    // 🔑 2️⃣ Primer login → /crear-contrasena
    if (isFirstLogin && !isSetPasswordRoute) {
      console.warn("Redirigiendo: Se requiere crear contraseña.");
      setLocation("/crear-contrasena");
      return;
    }

    // 🚫 3️⃣ Ya tiene contraseña, pero intenta ir a /crear-contrasena
    if (isSetPasswordRoute && !isFirstLogin) {
      console.warn("Redirigiendo: Contraseña ya configurada. Enviando a /dashboard.");
      setLocation("/dashboard");
      return;
    }

    // ⚙️ 4️⃣ Falta rol requerido
    if (requiredRoles.length > 0 && !hasRequiredRole(requiredRoles)) {
      console.warn(`Acceso denegado. Rol: ${role} → redirigiendo a /dashboard.`);
      setLocation("/dashboard");
      return;
    }
  }, [isAuthenticated, isFirstLogin, isSetPasswordRoute, requiredRoles, role, setLocation]);

  // 🚪 Mientras valida, o si está redirigiendo, no renderices nada
  if (
    !isAuthenticated ||
    (isFirstLogin && !isSetPasswordRoute) ||
    (isSetPasswordRoute && !isFirstLogin) ||
    (requiredRoles.length > 0 && !hasRequiredRole(requiredRoles))
  ) {
    return null;
  }

  // ✅ Todo OK → renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
