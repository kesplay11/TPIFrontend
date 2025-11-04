
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import Login from './features/Login/LoginView';
import { Redirect, Route, Switch } from "wouter";
import { auth } from './localStorage/localstorage';
import ProtectedRoute from './services/ProtectedRoute';
import SetPassword from "../src/features/Login/SetPassword"




function App() {
  const getInitialRoute = () => {
    const role = auth.getUserRole();

    if (!auth.getToken() || !role) return "/login";

    if(auth.getIsFirstLogin()) return "/crear-contraseña";
    switch (role) {
        case 'coordinador':
            return "/coordinador/dashboard";
        case 'capitan': 
            return "/capitan/dashboard";
        case 'alumno': 
            return "/alumno/dashboard";
        default:
            console.error("Rol desconocido para la redireccion:", role);
            return "/login"; // ✅ Retorno de seguridad
    }
  }
  return( 
    <>

<Switch>
      {/* Página raíz: Login */}
      <Route path="/" component={Login} />

      {/* 💡 RUTA DE CONFIGURACIÓN DE CONTRASEÑA */}
      {/* Usaremos un ProtectedRoute especial para esta vista */}
      /* <ProtectedRoute 
          path="/crear-contrasena" 
          component={SetPassword} 
          requiredRoles={['coordinador', 'capitan', 'alumno']} // Todos los roles pueden acceder, pero con lógica especial dentro.
          isSetPasswordRoute={true}
      />
      {/*
      <ProtectedRoute 
        path="/coordinador/dashboard"
        component={CoordinadorDashboard}
        requiredRoles={["coordinador"]}
      />
      <ProtectedRoute 
          path="/capitan/dashboard" 
          component={CapitanDashboard} 
          requiredRoles={['capitan']} 
      />
      <ProtectedRoute 
          path="/alumno/dashboard" 
          component={AlumnoDashboard} 
          requiredRoles={['alumno']} 
      /> */}
      
      <Route>
        <Redirect to={getInitialRoute()} />
      </Route>
      <Route>
        <h1>404: Página no encontrada</h1>
      </Route>
    </Switch>

</>
  )
}

export default App
