import { Switch, Route, useLocation } from "wouter";
import ListadoPersonas from "./views/ListadoPersonas";
import VerificarDocumento from "./views/VerificarDniView";
import CrearUsuarioView from "./views/CrearUsuarioView";
import EditarUsuario from "./views/EditarUsuario";
import BarraGestionPersonas from "./components/BarraGestionPersonas";

export default function AdminViewPersonas() {
  
  return (
    <div className="relative flex h-auto w-full flex-col justify-between bg-background-light dark:bg-background-dark font-display">

      
        <Switch >
          <Route path="/editar-usuario" component={ListadoPersonas} />
          <Route path="/verificar" component={VerificarDocumento} />
          <Route path="/usuarios" component={CrearUsuarioView} />
          <Route path="/:persona_id" component={EditarUsuario} />

          {/* Página base con botones */}
          <Route path="/">
            <BarraGestionPersonas></BarraGestionPersonas>
          </Route>

          {/* Catch-all */}
          <Route>
            <h1>⚠️ 404 interno de Personas</h1>
          </Route>
        </Switch>
   
    </div>
  );
}
