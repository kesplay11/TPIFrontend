import { useEffect, useState } from 'react';
import { Route, Router, Switch, useLocation } from 'wouter';
import { Box } from '@mui/material';

import PerfilView from "../pages/Perfil/PerfilView";
import JuegosView from '../pages/Juegos/JuegosView';
import BarraDeNavegacion from '../common/BarraDeNavegacion';
import AdminPuntosView from '../pages/Puntos/AdminPuntosView';
import MasView from '../pages/Mas/MasView';


export default function DashboardLayout() {
    const [location, setLocation] = useLocation();
    const [paddingBottom, setPaddingBottom] = useState('56px');

    // Redirección inicial desde /dashboard hacia /dashboard/perfil
    useEffect(() => {
        if (location === "/dashboard" || location === "/dashboard/") {
            setTimeout(() => setLocation("/dashboard/perfil"));
        }
    }, [location, setLocation]);

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh',
                pb: paddingBottom 
            }}
        >
            <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#f5f7f8' }}>
                <Router base="/dashboard">
                    <Switch>
                        {/* Rutas principales */}
                        <Route path="/perfil/:rest*?" component={PerfilView} />
                        <Route path="/juegos/:rest*?" component={JuegosView} />
                        <Route path="/mas/:rest*?" component={MasView} />
                        <Route path="/mas/personas/:rest*?" component={MasView} />
                        

                        {/* Módulo Personas
                        <Route path="/personas/:rest*?" component={AdminViewPersonas} /> */}

                        <Route path="/puntos/:rest*?" component={AdminPuntosView}/>
                        <Route path="/puntos/:rest*?/rondas/:rest*?/cargar-puntos" component={AdminPuntosView}/>

                        {/* Rutas que no coinciden */}
                        <Route path="/:rest*?">
                            <div style={{ color: "red" }}>
                                ⚠️ Ruta interna no encontrada: {window.location.pathname}
                            </div>
                        </Route>

                        <Route>
                            <h1>404 interno del Dashboard</h1>
                        </Route>
                    </Switch>
                    <BarraDeNavegacion />
                </Router>
            </Box>
        </Box>
    );
}
