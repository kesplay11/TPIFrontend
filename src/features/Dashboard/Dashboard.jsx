import { useEffect, useState } from 'react';
import { Route, Switch, useLocation, Redirect } from 'wouter';
import { Box } from '@mui/material';
import PerfilView from '../pages/Perfil/PerfilView'
import JuegosView from '../pages/Juegos/JuegosView';
import PersonasView from '../pages/Personas/PersonasView';
// Componentes y Vistas
// Corrección: Añadimos la extensión .jsx para resolver el error de importación
import BarraDeNavegacion from '../common/BarraDeNavegacion';
import ListadoPersonas from "../pages/Personas/views/ListadoPersonas";
// Importa aquí tus otras vistas



/**
 * DashboardLayout es el componente central que gestiona la estructura de la aplicación 
 * después del login. Muestra el contenido principal y la barra de navegación fija.
 */
export default function DashboardLayout() {
    const [location] = useLocation();
    
    // State para determinar la altura del padding inferior, para que el contenido
    // no quede oculto bajo la BarraDeNavegacion fija.
    const [paddingBottom, setPaddingBottom] = useState('56px'); // Altura estándar de BottomNavigation

    // useEffect para simular el cálculo de la altura de la barra si fuera necesario, 
    // aunque 56px es el estándar de MUI.
    useEffect(() => {
        // En una app real, podrías usar un ref para medir la altura exacta de la barra.
        // Por ahora, usamos el valor fijo:
        setPaddingBottom('56px'); 
    }, []);


    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh',
                // El padding inferior es CRUCIAL para que el contenido de scroll no se oculte
                pb: paddingBottom 
            }}
        >
            {/* ---------------------------------------------------- */}
            {/* 1. Área de Contenido Principal (que va a cambiar)    */}
            {/* ---------------------------------------------------- */}
            <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#f5f7f8' }}>
                <Switch location={location}>
                    {/* Ruta base del Dashboard: Redirige a la primera opción permitida */}
                    {/* <Route path="/dashboard" component={HomeRedirect} /> */}

                    {/* Rutas de Navegación Comunes */}
                    {/* <Route path="/juegos" component={JuegosVista} /> */}

                    <Route path="/dashboard">
                        <Redirect to="/dashboard/perfil" />
                    </Route>
                    <Route path="/dashboard/perfil" component={PerfilView} />

                    <Route path={"/dashboard/juegos"} component={JuegosView} />
                    
                    <Route path={"/dashboard/personas"} component={PersonasView} />

                    {/* <Route path={} component={} /> */}
                    

                    {/* Rutas condicionales (filtradas por la BarraDeNavegacion) */}
                    {/* <Route path="/resultados" component={ResultadosVista} />
                    <Route path="/puntos" component={PuntosVista} />
                    <Route path="/mas" component={MasVista} /> */}

                    {/* Puedes agregar una ruta 404 aquí si es necesario */}
                </Switch>
            </Box>

            {/* ---------------------------------------------------- */}
            {/* 2. Barra de Navegación Fija (SIEMPRE visible)       */}
            {/* ---------------------------------------------------- */}
            <BarraDeNavegacion />
        </Box>
    );
}