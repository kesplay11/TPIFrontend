import { Router, Route, Redirect } from "wouter";
import Login from "./features/Login/LoginView";
import SetPassword from "./features/Login/SetPassword";
import DashboardLayout from "./features/Dashboard/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PerfilView from "./features/Perfil/PerfilView";
import AdminPuntosView from "./features/Puntos/AdminPuntosView";
import ListadoPersonas from "./features/Personas/views/ListadoPersonas";
import CargarPuntosView from "./features/Puntos/Views/CargarPuntosView";
import ConfirmarPuntos from "./features/Puntos/Views/ConfirmarPuntos";
import EditarPuntos from "./features/Puntos/Views/EditarPuntos";
import JuegosView from "./features/Juegos/JuegosView";
import MasView from "./features/Mas/MasView";
import AdminViewPersonas from "./features/Personas/AdminViewPersonas";
import TurnosView from "./features/Turnos/TurnosView";
import EquiposView from "./features/Equipos/EquiposView";
import CategoriasView from "./features/Categorias/CategoriasView";
import ResultadosView from "./features/Resultados/ResultadosView";
import CrearUsuario from "./features/Personas/views/CrearUsuarioView";
import DashboardRoute from "./routes/DashboardRoute";
import VerificarDocumento from "./features/Personas/views/VerificarDniView";
import EditarUsuario from "./features/Personas/views/EditarUsuario";

import PuntosRechazadosView from "./features/Puntos/Views/PuntosRechazados";

import AgregarCategoriaView from "./features/Categorias/views/AgregarCategoriaView";
import ListadoCategoriasView from "./features/Categorias/views/ListadoCategoriasView";
import EditarCategoriaView from "./features/Categorias/views/EditarCategoriaView"
import ReactivarCategoriaView from "./features/Categorias/views/ReactivarCategoriaView";

import AgregarEquipoView from "./features/Equipos/views/AgregarEquipoView";
import EditarEquipoView from "./features/Equipos/views/EditarEquipoView";
import ListadoEquipos from "./features/Equipos/views/ListadoEquiposViews";
import ReactivarEquiposView from "./features/Equipos/views/ReactivarEquiposView";

import ListadoTurnosView from "./features/Turnos/views/ListadoTurnosView";
import ReactivarTurnosView from "./features/Turnos/views/ReactivarTurnosView";
import AgregarTurnoView from "./features/Turnos/views/AgregarTurnoView";
import EditarTurnoView from "./features/Turnos/views/EditarTurnoView";

import ListadoJuegosView from "./features/Juegos/views/ListadoJuegosView";
import ListadoJuegosEditarView from "./features/Juegos/views/ListadoJuegosEditarView";
import AgregarJuegoView from "./features/Juegos/views/AgregarJuegoView";
import EditarJuegoView from "./features/Juegos/views/EditarJuegoView";
import EditarRondaView from "./features/Juegos/views/EditarRondaView";


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

      <Route path="/dashboard/juegos">
        <DashboardRoute requiredRoles={['coordinador']}>
          <JuegosView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/juegos/listar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <ListadoJuegosEditarView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/juegos/agregar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <AgregarJuegoView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/juegos/editar-juego/:juego_id">
        <DashboardRoute requiredRoles={['coordinador']}>
          <EditarJuegoView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/juegos/editar-ronda/:juego_ronda_id">
        <DashboardRoute requiredRoles={['coordinador']}>
          <EditarRondaView/>
        </DashboardRoute>
      </Route>

      {/* Puntos */}
      <Route path="/dashboard/puntos">
        <DashboardRoute requiredRoles={['coordinador']}>
          <AdminPuntosView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/puntos/cargar">
        <DashboardRoute requiredRoles={['coordinador','capitan']}>
          <ListadoJuegosView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/puntos/:juego_id/rondas/:ronda_id/equipos/:equipo_id/cargar-puntos">
        <DashboardRoute requiredRoles={['coordinador','capitan']}>
          <CargarPuntosView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/puntos/confirmar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <ConfirmarPuntos />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/puntos/editar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <EditarPuntos />
        </DashboardRoute>
      </Route>

      {/* Más */}
      <Route path="/dashboard/mas">
        <DashboardRoute requiredRoles={['coordinador']}>
          <MasView />
        </DashboardRoute>
      </Route>

      {/* RUTAS DE PERSONAS */}
      <Route path="/dashboard/mas/personas">
        <DashboardRoute requiredRoles={['coordinador']}>
          <AdminViewPersonas />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/personas/verificar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <VerificarDocumento/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/personas/usuarios">
        <DashboardRoute requiredRoles={['coordinador']}>
          <ListadoPersonas/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/personas/editar-usuario/:persona_id">
        <DashboardRoute requiredRoles={['coordinador']}>
          <EditarUsuario/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/personas/crear-usuario">
        <DashboardRoute requiredRoles={['coordinador']}>
          <CrearUsuario/>
        </DashboardRoute>
      </Route>

      {/* Rutas de Turnos */}
      <Route path="/dashboard/mas/turnos">
        <DashboardRoute requiredRoles={['coordinador']}>
          <TurnosView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/turnos/listar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <ListadoTurnosView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/turnos/reactivar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <ReactivarTurnosView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/turnos/agregar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <AgregarTurnoView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/turnos/editar-turno/:turno_id">
        <DashboardRoute requiredRoles={['coordinador']}>
          <EditarTurnoView/>
        </DashboardRoute>
      </Route>

      {/* Rutas de equipos */}
      <Route path="/dashboard/mas/equipos">
        <DashboardRoute requiredRoles={['coordinador']}>
          <EquiposView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/equipos/agregar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <AgregarEquipoView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/equipos/listar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <ListadoEquipos/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/equipos/reactivar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <ReactivarEquiposView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/equipos/editar-equipo/:equipo_id">
        <DashboardRoute requiredRoles={['coordinador']}>
          <EditarEquipoView/>
        </DashboardRoute>
      </Route>

      {/* Rutas de categorias */}
      <Route path="/dashboard/mas/categorias">
        <DashboardRoute requiredRoles={['coordinador']}>
          <CategoriasView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/categorias/agregar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <AgregarCategoriaView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/categorias/listar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <ListadoCategoriasView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/categorias/reactivar">
        <DashboardRoute requiredRoles={['coordinador']}>
          <ReactivarCategoriaView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/categorias/editar-categoria/:categoria_id">
        <DashboardRoute requiredRoles={['coordinador']}>
          <EditarCategoriaView/>
        </DashboardRoute>
      </Route>

      {/* Rutas de resultados */}
      <Route path="/dashboard/mas/resultados">
        <DashboardRoute requiredRoles={['coordinador']}>
          <ResultadosView />
        </DashboardRoute>
      </Route>

      {/* Rutas de resultados para los capitanes y alumnos */}
      <Route path="/dashboard/resultados">
        <DashboardRoute requiredRoles={['coordinador','capitan','alumno']}>
          <ResultadosView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/juegos-capitan">
        <DashboardRoute requiredRoles={['coordinador','capitan','alumno']}>
          <ListadoJuegosView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/puntos-capitan">
        <DashboardRoute requiredRoles={['coordinador','capitan']}>
          <PuntosRechazadosView/>
        </DashboardRoute>
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
        <Redirect to="/login"/>
      </Route>

      <Route path="/404">
        <h1>Página no encontrada</h1>
      </Route>

    </Router>
  );
}