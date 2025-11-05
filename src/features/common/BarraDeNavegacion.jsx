import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter'; 
import { auth } from '../../localStorage/localstorage';

// Importamos los íconos necesarios para las opciones
import StarIcon from '@mui/icons-material/Star';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import { Box } from '@mui/material'; // Importamos Box de MUI

// 1. Definición de todas las opciones y sus permisos
const navigationOptions = [
    { 
        label: "Juegos", 
        icon: <SportsEsportsIcon />, 
        route: "/juegos",
        roles: ['alumno', 'capitan', 'coordinador']
    },
    { 
        label: "Resultados", 
        icon: <ScoreboardIcon />, 
        route: "/resultados",
        roles: ['alumno', 'capitan']
    },
    { 
        label: "Puntos", // Opción de Coordinador
        icon: <StarIcon/>,
        route: "/puntos",
        roles:["coordinador"]
    },
    { 
        label: "Perfil", 
        icon: <AccountCircleIcon />, 
        route: "/perfil",
        roles: ['alumno', 'capitan', 'coordinador']
    },
    { 
        label: "Más", // Opción de Coordinador
        icon: <MoreHorizIcon />, 
        route: "/mas",
        roles: ['coordinador']
    }
];


export default function BarraDeNavegacion() {
    // El 'value' representa el índice del botón activo en el arreglo filtrado
    const [value, setValue] = useState(0); 
    const [allowedOptions, setAllowedOptions] = useState([]);

    // Usamos wouter para obtener el path actual y la función para navegar
    const [location, setLocation] = useLocation();

    // Obtenemos el rol del usuario. Usamos useEffect para evitar errores de renderizado.
    const userRole = auth.getUserRole() || ''; 

    // 2. Efecto para determinar las opciones permitidas y la navegación inicial
    useEffect(() => {
        // Filtrar opciones por el rol del usuario
        const filtered = navigationOptions.filter(option => 
            option.roles.includes(userRole)
        );
        setAllowedOptions(filtered);

        // Si no hay opciones permitidas, salimos.
        if (filtered.length === 0) return;

        // 3. Lógica de Sincronización y Redirección de Inicio
        
        // Buscamos si la ruta actual (location) coincide con alguna opción permitida
        const activeIndex = filtered.findIndex(option => 
            // Usamos startsWith para manejar sub-rutas (ej: /juegos/detalles)
            location.startsWith(option.route)
        );

        if (activeIndex !== -1) {
            // Caso A: La URL actual coincide con un botón de la barra (o una sub-ruta).
            // Mantenemos el índice activo.
            setValue(activeIndex);
        } else if (location === '/dashboard') {
            // Caso B: Si estamos en la URL base (/dashboard), 
            // redirigimos a la primera opción permitida.
            const initialRoute = filtered[0].route;
            console.log(`Navegación inicial: de /dashboard a ${initialRoute}`);
            setLocation(initialRoute, { replace: true });
            // Forzamos el valor a 0 porque sabemos que será la primera opción
            setValue(0); 
        } else {
            // Caso C: Estamos en una ruta protegida diferente (ej: /crear-contrasena o /login)
            // o en una sub-ruta que no queremos destacar, no hacemos nada y dejamos el valor en 0.
            setValue(0);
        }

    }, [userRole, location, setLocation]); // Dependencias: userRole, location y setLocation


    const handleChange = (event, newValue) => {
        const selectedOption = allowedOptions[newValue];
        
        if (selectedOption) {
            // 4. Usamos setLocation de wouter para cambiar la ruta a la opción seleccionada
            setLocation(selectedOption.route);
            setValue(newValue);
        }
    };


    if (!userRole || allowedOptions.length === 0) {
        // No renderizamos si no hay rol o si no tiene opciones.
        return null;
    }

    return (
        <Box 
            component="nav"
            className="bg-[#f5f7f8] shadow-2xl" 
            sx={{ 
                width: '100%', 
                position:"fixed", 
                bottom: 0, 
                zIndex: 100, 
                // Añadimos un padding o altura mínima para evitar que el contenido
                // se oculte detrás de la barra en la parte inferior
                minHeight: '56px' 
            }}
        > 
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
                // Usamos un fondo ligero y elevación para que se vea bien
                sx={{bgcolor: '#f5f7f8' }} 
            >
                {/* Mapeamos solo las opciones filtradas */}
                {allowedOptions.map((option, index) => (
                    <BottomNavigationAction 
                        key={option.route} // Usar la ruta como key
                        label={option.label} 
                        icon={option.icon} 
                        // El valor es el índice en el arreglo filtrado
                        value={index} 
                        // Configuramos el color para que el elemento activo se destaque
                        sx={{
                            color: location.startsWith(option.route) ? 'primary.main' : 'text.secondary',
                            '&.Mui-selected': {
                                color: 'primary.main',
                                fontWeight: 'bold',
                            },
                            // Mejorar el espaciado en pantallas pequeñas
                            minWidth: 'auto',
                            padding: '6px 4px',
                        }}
                    />
                ))}
            </BottomNavigation>
        </Box>
    );
}