import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import Login from './features/Login/LoginView';
import ProtectedRoute from './services/ProtectedRoute.jsx';
import SetPassword from "./features/Login/SetPassword.jsx";
import Dashboard from './features/Dashboard/Dashboard.jsx';
import { auth } from './localStorage/localstorage';

function App() {
  const [location, setLocation] = useLocation();

  function getInitialRoute() {
    auth.logout();
    console.log("llegamos a la funcion");
    const role = auth.getUserRole();
    console.log("veamos que tiene rol", role);
    const isAuthenticated = auth.getToken();
    console.log("veamps cuales estan autenticados", isAuthenticated);
    const isFirstLogin = auth.getIsFirstLogin();
    console.log("es el primer login?", isFirstLogin);

    if (!isAuthenticated || !role) {
      console.log("No esta autenticado");
      return "/login";
    }
    if (isFirstLogin) {
      console.log("es el primer login");
      return "/crear-contrasena";
    }
    return "/dashboard";
  }

  useEffect(() => {
    const initial = getInitialRoute();
    if (location !== initial) {
      setLocation(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // se ejecuta una vez al montar

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute
        path="/crear-contrasena"
        component={SetPassword}
        requiredRoles={['coordinador', 'capitan', 'alumno']}
        isSetPasswordRoute={true}
      />
      {/* <ProtectedRoute 
        path="/dashboard" 
        component={Dashboard}
        requiredRoles={['coordinador', 'capitan', 'alumno']} 
      /> */}
      <ProtectedRoute
        path="/dashboard/:rest*?"
        component={Dashboard}
        requiredRoles={['coordinador', 'capitan', 'alumno']}
      />
      <Route>
        <h1>404: Página no encontrada</h1>
      </Route>
    </Switch>
  );
}

export default App;
