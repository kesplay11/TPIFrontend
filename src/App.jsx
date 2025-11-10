import React, { useEffect } from "react";
import { Route, Switch, useLocation, Router } from "wouter";
import Login from './features/Login/LoginView';
import ProtectedRoute from './services/ProtectedRoute.jsx';
import SetPassword from "./features/Login/SetPassword.jsx";
import DashboardLayout from './features/Dashboard/DashboardLayout.jsx';
import ListadoPersonas from "./features/pages/Personas/views/ListadoPersonas.jsx";
import AdminViewPersonas from "./features/pages/Personas/AdminViewPersonas.jsx";
import CrearUsuarioView from "./features/pages/Personas/views/CrearUsuarioView.jsx";
import VerificarDocumento from "./features/pages/Personas/views/VerificarDniView.jsx";
import EditarUsuario from "./features/pages/Personas/views/EditarUsuario.jsx";
import { auth } from './localStorage/localstorage';
import AdminPuntosView from "./features/pages/Puntos/AdminPuntosView.jsx";

function App() {
  const [location, setLocation] = useLocation();
  console.log("App location:", location);

  function getInitialRoute() {
    // auth.logout();
    console.log("llegamos a la funcion");
    const role = auth.getUserRole();
    console.log("veamos que tiene rol", role);
    const isAuthenticated = auth.getToken();
    console.log("veamps cuales estan autenticados", isAuthenticated);
    const isFirstLogin = auth.getIsFirstLogin();
    console.log("es el primer login?", isFirstLogin);
    const equipo = auth.getUserTeam();
    console.log(equipo)

    if (!isAuthenticated || !role) {
      console.log("No esta autenticado");
      return "/login";
    }
    if (isFirstLogin) {
      console.log("es el primer login");
      return "/crear-contrasena";
    }
    return "/dashboard/perfil";
  }

  useEffect(() => {
  const initial = getInitialRoute();
  // Solo redirige si estamos en la raíz
  if (location === "/" && initial !== "/") {
    setLocation(initial);
  }
}, []);


  return (
  <Router>
<Switch location={location}>
  <Route path="/login" component={Login} />

  <ProtectedRoute
    path="/crear-contrasena"
    component={SetPassword}
    requiredRoles={['coordinador', 'capitan', 'alumno']}
    isSetPasswordRoute={true}
  />
  <ProtectedRoute
    path="/dashboard/:rest*?"
    component={DashboardLayout}
    requiredRoles={['coordinador', 'capitan', 'alumno']}
  />
  <ProtectedRoute
  path="/dashboard/personas/editar-usuario"
  component={DashboardLayout}

  > 
   </ProtectedRoute>
     <ProtectedRoute
  path="/dashboard/personas/verificar"
  component={VerificarDocumento}

  > 
   </ProtectedRoute>
     <ProtectedRoute
  path="/dashboard/personas/usuarios"
  component={CrearUsuarioView}

  > 
   </ProtectedRoute>
     <ProtectedRoute
  path="/dashboard/personas/:persona_id"
  component={EditarUsuario}

  > 
   </ProtectedRoute>

<ProtectedRoute
  path="/dashboard/puntos/*"
  component={DashboardLayout}
  requiredRoles={['capitan','coordinador']}
/>
         <ProtectedRoute
  path="/dashboard/puntos/cargar"
  component={DashboardLayout}

  > 
   </ProtectedRoute>

   <ProtectedRoute
  path="/dashboard/puntos/:juegoId/rondas/:rondaId/cargar-puntos"
  component={DashboardLayout}
  requiredRoles={['capitan','coordinador']}
/>

   {/* <ProtectedRoute
  path="/dashboard/puntos/hola/si"
  component={DashboardLayout}
  requiredRoles={['capitan','coordinador']}
/> */}

  <Route>
    <h1>404: Página no encontrada</h1>
  </Route>
</Switch>
</Router>
  );
}

export default App;
