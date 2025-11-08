import React from 'react';
import { Link, Route, Switch, useRoute } from 'wouter'; // 👈 Importamos Route, Switch y useRoute

// Importaciones de Íconos
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// -----------------------------------------------------------
// 📌 IMPORTACIONES DE SUB-VISTAS (Asumimos que existen)
import CrearUsuarioView from './vistas/CrearUsuarioView';
import ListaEditarUsuariosView from './vistas/ListaEditarUsuariosView'; 
// -----------------------------------------------------------

export default function GestionUsuarios() {
    // 1. Usamos useRoute para saber si la ruta actual es exactamente '/usuarios'
    const [match] = useRoute("/usuarios"); 

    // Define las rutas para la lista principal de gestión
    const gestionLinks = [
        {
            to: "/usuarios/editar", 
            icon: <EditIcon />,
            text: "Listar/Editar Usuarios",
            ariaLabel: "Ver y editar usuarios existentes",
        },
        {
            to: "/usuarios/crear", 
            icon: <PersonAddIcon />,
            text: "Crear Nuevo Usuario",
            ariaLabel: "Crear un nuevo usuario",
        },
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col justify-between bg-background-light dark:bg-background-dark font-display">
            
            {/* Contenido principal y cabecera */}
            <div>
                {/* Header (Lo mantenemos fuera del Switch para que siempre sea visible) */}
                <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark sticky top-0 z-10 border-b border-primary/20 dark:border-primary/30">
                    {/* El botón de atrás es correcto */}
                    <button 
                        className="text-black dark:text-white" 
                        aria-label="Volver atrás"
                        onClick={() => history.back()} 
                    >
                        <ArrowBackIcon fontSize="medium" /> 
                    </button>
                    <h2 className="text-xl font-bold text-black dark:text-white flex-1 text-center">Gestión de Usuarios</h2>
                    <div className="w-8"></div>
                </header>

                {/* Main Content con las Rutas Anidadas */}
                <main className="p-4">
                    
                    {/*
                      El componente <Switch> asegura que solo se renderice UNA ruta anidada
                      (la que coincida) o el contenido por defecto.
                    */}
                    <Switch>
                        {/* ------------------------------------------------------------- */}
                        {/* RUTAS HIJAS: Muestra los formularios o listas específicas */}
                        {/* ------------------------------------------------------------- */}
                        
                        {/* Ruta para Crear Usuario: /usuarios/crear */}
                        <Route path="/usuarios/crear">
                            <CrearUsuarioView />
                        </Route>

                        {/* Ruta para Listar/Editar Usuarios: /usuarios/editar */}
                        <Route path="/usuarios/editar">
                            <ListaEditarUsuariosView />
                        </Route>

                        {/* ------------------------------------------------------------- */}
                        {/* RUTA PADRE POR DEFECTO: Muestra la lista de opciones (los Links) */}
                        {/* ------------------------------------------------------------- */}
                        
                        {/* Si ninguna ruta hija coincide, y la ruta coincide con '/usuarios' (match=true),
                          mostramos la lista de enlaces de gestión. 
                          Nota: Con Wouter, si pones el Route con path="/usuarios" y un Switch,
                          la primera que coincide gana. Usar el 'match' de useRoute o simplemente
                          el default (Route) si no coincide ninguna anterior, es la forma más limpia
                        */}
                        <Route>
                            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Opciones de Gestión</h2>
                            
                            <div className="space-y-4">
                                {gestionLinks.map((link, index) => (
                                    <Link 
                                        key={index}
                                        className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-black/20 shadow-sm hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors" 
                                        to={link.to} 
                                        aria-label={link.ariaLabel}
                                    >
                                        {link.icon}
                                        <p className="text-black dark:text-white text-base font-medium flex-1 truncate">{link.text}</p>
                                        <ChevronRightIcon className="text-black/50 dark:text-white/50" fontSize="medium" />
                                    </Link>
                                ))}
                            </div>
                        </Route>
                        
                    </Switch>
                </main>
            </div>
            
        </div>
    );
}