import { Switch, Route } from "wouter";
import ListadoPersonas from "./views/ListadoPersonas";
import VerificarDocumento from "./views/VerificarDniView";
import CrearUsuarioView from "./views/CrearUsuarioView";
import EditarUsuario from "./views/EditarUsuario";
import BarraGestionPersonas from "./components/BarraGestionPersonas";

export default function AdminViewPersonas() {
  return (
    <div className="relative flex h-auto w-full flex-col justify-between bg-background-light dark:bg-background-dark font-display">
      <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark sticky top-0 z-10 border-b border-primary/20 dark:border-primary/30">
        <h2 className="text-xl font-bold text-black dark:text-white flex-1 text-center">
          Gestión de Usuarios
        </h2>
      </header>

      
        <Switch>
          <Route path="/personas/editar-usuario" component={ListadoPersonas} />
          <Route path="/personas/verificar" component={VerificarDocumento} />
          <Route path="/personas/usuarios" component={CrearUsuarioView} />
          <Route path="/personas/:persona_id" component={EditarUsuario} />

          {/* Página base con botones */}
          <Route path="/personas">
            <BarraGestionPersonas />
          </Route>

          {/* Catch-all */}
          <Route>
            <h1>⚠️ 404 interno de Personas</h1>
          </Route>
        </Switch>
   
    </div>
  );
}
