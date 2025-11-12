import { Switch, Route, Router } from "wouter";
// import JuegosView from "../Juegos/JuegosView"; // Importamos la vista que usábamos para cargar puntos
// import ConfirmarPuntos from "./views/ConfirmarPuntos"; // Vista nueva
// import EditarPuntos from "./views/EditarPuntos"; // Vista nueva
// import BarraGestionPuntos from "./components/BarraGestionPuntos"; // Opcional, botones internos
import JuegosView from "../Juegos/JuegosView";
import ConfirmarPuntos from "./Views/ConfirmarPuntos";
import EditarPuntos from "./Views/EditarPuntos"
import BarraGestionPuntos from "./components/BarraGestionPuntos";
import CargarPuntosView from "./Views/CargarPuntosView";

export default function AdminPuntosView() {
  return (
    <div className="relative flex h-auto w-full flex-col justify-between bg-background-light dark:bg-background-dark font-display">
      <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark sticky top-0 z-10 border-b border-primary/20 dark:border-primary/30">
        <h2 className="text-xl font-bold text-black dark:text-white flex-1 text-center">
          Gestión de Puntos
        </h2>
      </header>

<Router base="/puntos">
  <Switch>
    <Route path="/cargar">
      <CargarPuntosView></CargarPuntosView>
    </Route>
    <Route path="/confirmar" component={ConfirmarPuntos} />
    <Route path="/:juegoId/rondas/:rondaId/cargar-puntos" component={CargarPuntosView} />
    <Route path="/" component={BarraGestionPuntos} />
    <Route><h1>404 interno de Puntos</h1></Route>
  </Switch>
</Router>

    </div>
  );
}
