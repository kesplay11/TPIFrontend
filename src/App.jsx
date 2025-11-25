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
        <DashboardRoute>
          <JuegosView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/juegos/listar">
        <DashboardRoute>
          <ListadoJuegosEditarView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/juegos/agregar">
        <DashboardRoute>
          <AgregarJuegoView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/juegos/editar-juego/:juego_id">
        <DashboardRoute>
          <EditarJuegoView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/juegos/editar-ronda/:juego_ronda_id">
        <DashboardRoute>
          <EditarRondaView/>
        </DashboardRoute>
      </Route>

      {/* Puntos */}
      <Route path="/dashboard/puntos">
        <DashboardRoute>
          <AdminPuntosView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/puntos/cargar">
        <DashboardRoute>
          <ListadoJuegosView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/puntos/:juego_id/rondas/:ronda_id/equipos/:equipo_id/cargar-puntos">
        <DashboardRoute>
          <CargarPuntosView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/puntos/confirmar">
        <DashboardRoute>
          <ConfirmarPuntos />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/puntos/editar">
        <DashboardRoute>
          <EditarPuntos />
        </DashboardRoute>
      </Route>

      {/* Más */}
      <Route path="/dashboard/mas">
        <DashboardRoute>
          <MasView />
        </DashboardRoute>
      </Route>

      {/* RUTAS DE PERSONAS */}
      <Route path="/dashboard/mas/personas">
        <DashboardRoute>
          <AdminViewPersonas />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/personas/verificar">
        <DashboardRoute>
          <VerificarDocumento/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/personas/usuarios">
        <DashboardRoute>
          <ListadoPersonas/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/personas/editar-usuario/:persona_id">
        <DashboardRoute>
          <EditarUsuario/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/personas/crear-usuario">
        <DashboardRoute>
          <CrearUsuario/>
        </DashboardRoute>
      </Route>

      {/* Rutas de Turnos */}
      <Route path="/dashboard/mas/turnos">
        <DashboardRoute>
          <TurnosView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/turnos/listar">
        <DashboardRoute>
          <ListadoTurnosView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/turnos/reactivar">
        <DashboardRoute>
          <ReactivarTurnosView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/turnos/agregar">
        <DashboardRoute>
          <AgregarTurnoView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/turnos/editar-turno/:turno_id">
        <DashboardRoute>
          <EditarTurnoView/>
        </DashboardRoute>
      </Route>

      {/* Rutas de equipos */}
      <Route path="/dashboard/mas/equipos">
        <DashboardRoute>
          <EquiposView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/equipos/agregar">
        <DashboardRoute>
          <AgregarEquipoView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/equipos/listar">
        <DashboardRoute>
          <ListadoEquipos/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/equipos/reactivar">
        <DashboardRoute>
          <ReactivarEquiposView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/equipos/editar-equipo/:equipo_id">
        <DashboardRoute>
          <EditarEquipoView/>
        </DashboardRoute>
      </Route>

      {/* Rutas de categorias */}
      <Route path="/dashboard/mas/categorias">
        <DashboardRoute>
          <CategoriasView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/categorias/agregar">
        <DashboardRoute>
          <AgregarCategoriaView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/categorias/listar">
        <DashboardRoute>
          <ListadoCategoriasView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/categorias/reactivar">
        <DashboardRoute>
          <ReactivarCategoriaView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/mas/categorias/editar-categoria/:categoria_id">
        <DashboardRoute>
          <EditarCategoriaView/>
        </DashboardRoute>
      </Route>

      {/* Rutas de resultados */}
      <Route path="/dashboard/mas/resultados">
        <DashboardRoute>
          <ResultadosView />
        </DashboardRoute>
      </Route>

      {/* Rutas de resultados para los capitanes y alumnos */}
      <Route path="/dashboard/resultados">
        <DashboardRoute>
          <ResultadosView />
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/juegos-capitan">
        <DashboardRoute>
          <ListadoJuegosView/>
        </DashboardRoute>
      </Route>

      <Route path="/dashboard/puntos-capitan">
        <DashboardRoute>
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