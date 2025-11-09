import { useLocation } from "wouter";
import { auth, hasRequiredRole } from "../localStorage/localstorage";

const ProtectedRoute = ({ component: Component, path, requiredRoles = [], isSetPasswordRoute = false }) => {
  const isAuthenticated = !!auth.getToken();
  const isFirstLogin = auth.getIsFirstLogin();
  const [, setLocation] = useLocation();

  // 🔒 1️⃣ No autenticado → /login
  if (!isAuthenticated) {
    console.warn("Redirigiendo: No autenticado.");
    setLocation("/login");
    console.log("No estas autentcado");
    return null;
  }

  // 🔑 2️⃣ Primer login → /crear-contrasena
  if (isFirstLogin && !isSetPasswordRoute) {
    console.warn("Redirigiendo: Se requiere crear contraseña.");
    setLocation("/crear-contrasena");
    console.log("es el primer login");
    return null;
  }

  // 🚫 3️⃣ Ya tiene contraseña, pero va a /crear-contrasena → /dashboard
  if (isSetPasswordRoute && !isFirstLogin) {
    console.warn("Redirigiendo: Contraseña ya configurada. Enviando a /dashboard.");
    console.log("ya tien contrraseña pero va a crear contraseña");
    setLocation("/dashboard");
    return null;
  }

  // ⚙️ 4️⃣ Falta rol requerido
  if (requiredRoles.length > 0 && !hasRequiredRole(requiredRoles)) {
    console.warn(`Acceso denegado. Rol: ${auth.getUserRole()} intentó acceder a ${path}. Redirigiendo a /dashboard.`);
    setLocation("/dashboard");
    console.log("No tnees el rol crack");
    return null;
  }

  // ✅ 5️⃣ Todo OK → renderiza directamente el componente
  return <Component />;
};

export default ProtectedRoute;
