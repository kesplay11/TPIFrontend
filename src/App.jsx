
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import Login from './Login/LoginView';
import { Route, Switch } from "wouter";




function App() {
  return(
    <>

<Switch>
      {/* Página raíz: Login */}
      <Route path="/" component={Login} />

      {/* Ruta 404 */}
      <Route>
        <h1>404: Página no encontrada</h1>
      </Route>
    </Switch>

</>
  )
}

export default App
