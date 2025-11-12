import { Box, Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { Switch, Route } from 'wouter';


import EquiposView from '../Equipos/EquiposView';
import CategoriasView from '../Categorias/CategoriasView';
import AdminViewPersonas from '../Personas/AdminViewPersonas';
import BarraMasOpciones from './components/BarraMasOpciones';
import TurnosView from '../Turnos/TurnosView';
import ResultadosView from '../Resultados/ResultadosView';

export default function MasView() {

  return (
    <div>
      <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark sticky top-0 z-10 border-b border-primary/20 dark:border-primary/30">
        <h2 className="text-xl font-bold text-black dark:text-white flex-1 text-center">
          Gestión de Puntos
        </h2>
      </header>

      <Switch>
        {/* Rutas de puntos */}
        <Route path="/personas/:rest*?" component={AdminViewPersonas} />
        <Route path="/turnos" component={TurnosView} />
        <Route path="/equipos" component={EquiposView} />
        <Route path="/categorias"  component={CategoriasView} />
        <Route path="/resultados" component={ResultadosView} />


        <Route path="/">
            <BarraMasOpciones></BarraMasOpciones>
        </Route>

        {/* Catch-all */}
        <Route>
          <h1>⚠️ 404 interno de Mas</h1>
        </Route>
      </Switch>
   
    </div>
  );
}
