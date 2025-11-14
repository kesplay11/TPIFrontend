import { Router, Route, Redirect } from "wouter";
import Login from "./features/Login/LoginView";
import SetPassword from "./features/Login/SetPassword";
import DashboardLayout from "./features/Dashboard/DashboardLayout";
import ProtectedRoute from "./services/ProtectedRoute";
import PerfilView from "./features/pages/Perfil/PerfilView";
import AdminPuntosView from "./features/pages/Puntos/AdminPuntosView";
import ListadoPersonas from "./features/pages/Personas/views/ListadoPersonas";
import CargarPuntosView from "./features/pages/Puntos/Views/CargarPuntosView";
import ConfirmarPuntos from "./features/pages/Puntos/Views/ConfirmarPuntos";
import EditarPuntos from "./features/pages/Puntos/Views/EditarPuntos";
import JuegosView from "./features/pages/Juegos/JuegosView";
import MasView from "./features/pages/Mas/MasView";
import AdminViewPersonas from "./features/pages/Personas/AdminViewPersonas";
import TurnosView from "./features/pages/Turnos/TurnosView";
import EquiposView from "./features/pages/Equipos/EquiposView";
import CategoriasView from "./features/pages/Categorias/CategoriasView";
import ResultadosView from "./features/pages/Resultados/ResultadosView";
import CrearUsuario from "./features/pages/Personas/views/CrearUsuarioView";
import DashboardRoute from "./helpers/DashboardRoute";
import VerificarDocumento from "./features/pages/Personas/views/VerificarDniView";
import EditarUsuario from "./features/pages/Personas/views/EditarUsuario";
import AgregarCategoriaView from "./features/pages/Categorias/views/AgregarCategoriaView";
import ListadoCategoriasView from "./features/pages/Categorias/views/ListadoCategoriasView";
import EditarCategoriaView from "./features/pages/Categorias/views/EditarCategoriaView"


export default function App() {
  return (
    <Router>
      {/* Públicas */}
      <Route path="/login">
        <Login/>
      </Route>

      <Route path="/crear-contrasena">
        <ProtectedRoute isSetPasswordRoute>
          <SetPassword />
        </ProtectedRoute>
      </Route>

      <Route path="/dashboard/perfil">
        <DashboardRoute>
          <PerfilView/>
        </DashboardRoute>
      </Route>

      {/* Dashboard - rutas ABSOLUTAS */}
      {/* <Route path="/dashboard/perfil">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <PerfilView />
          </DashboardLayout>
        </ProtectedRoute>
      </Route> */}

      <Route path="/dashboard/juegos">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <JuegosView />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      {/* Puntos */}
      <Route path="/dashboard/puntos">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <AdminPuntosView />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/dashboard/puntos/cargar">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <JuegosView/>
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/dashboard/puntos/:juegoId/rondas/:rondaId/cargar-puntos">
        <DashboardLayout>
          <CargarPuntosView></CargarPuntosView>
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/puntos/confirmar">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <ConfirmarPuntos />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/dashboard/puntos/editar">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <EditarPuntos />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      {/* Más */}
      <Route path="/dashboard/mas">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <MasView />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/dashboard/mas/personas">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <AdminViewPersonas />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/dashboard/mas/personas/verificar">
        <DashboardLayout>
          <VerificarDocumento/>
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/mas/personas/usuarios">
        <DashboardLayout>
          <ListadoPersonas/>
        </DashboardLayout>
      </Route>

      <Route path={"/dashboard/mas/personas/editar-usuario/:persona_id"}>
        <DashboardLayout>
          <EditarUsuario/>
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/mas/personas/crear-usuario" >
        <DashboardRoute>
          <CrearUsuario/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/turnos">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <TurnosView />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/dashboard/mas/equipos">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <EquiposView />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/dashboard/mas/categorias">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardRoute>
            <CategoriasView />
          </DashboardRoute>
        </ProtectedRoute>
      </Route>

      <Route path="/dashboard/mas/categorias/agregar">
        <DashboardLayout>
          <AgregarCategoriaView/>
        </DashboardLayout>
      </Route>

      <Route path="/dashboard/mas/categorias/listar">
        <DashboardRoute>
          <ListadoCategoriasView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/categorias/editar-categoria/:categoria_id">
        <DashboardRoute>
          <EditarCategoriaView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/resultados">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <ResultadosView />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      {/* Redirección desde /dashboard */}
      <Route path="/dashboard">
        <ProtectedRoute requiredRoles={['coordinador', 'capitan', 'alumno']}>
          <DashboardLayout>
            <Redirect to="/dashboard/perfil" />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      {/* Fallback global */}
      <Route path="/">
        <h1>Estas mal GLOBALMENTE</h1>
      </Route>
    </Router>
  );
}