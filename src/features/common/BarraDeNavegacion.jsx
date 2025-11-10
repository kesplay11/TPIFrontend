import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { auth } from '../../localStorage/localstorage';

// Íconos
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StarIcon from '@mui/icons-material/Star';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box } from '@mui/material';

// Todas las opciones posibles
const allOptions = [
  { label: "Perfil", icon: <AccountCircleIcon />, route: "/perfil", roles: ['alumno', 'capitan', 'coordinador'] },
  { label: "Juegos", icon: <SportsEsportsIcon />, route: "/juegos", roles: ['alumno', 'capitan', 'coordinador'] },
  { label: "Puntos", icon: <SportsEsportsIcon />, route: "/puntos", roles: ['coordinador'] },
  { label: "Resultados", icon: <AssessmentIcon />, route: "/resultados", roles: ['alumno', 'capitan', 'coordinador'] },
  { label: "Personas", icon: <StarIcon />, route: "/personas", roles: ['coordinador'] },
  { label: "Turnos", icon: <StarIcon />, route: "/turnos", roles: ['coordinador'] },
  { label: "Equipos", icon: <StarIcon />, route: "/equipos", roles: ['coordinador'] },
];

export default function BarraDeNavegacion() {
  const [value, setValue] = useState(0);
  const [allowedOptions, setAllowedOptions] = useState([]);
  const [location, setLocation] = useLocation();
  const hasRedirected = useRef(false);

  const userRole = auth.getUserRole() || '';
  
  useEffect(() => {
    let options = [];
    if (userRole === 'coordinador') {
      // Perfil, Puntos, Juegos, Más
      options = [
        allOptions.find(o => o.label === "Perfil"),
        allOptions.find(o => o.label === "Puntos"),
        allOptions.find(o => o.label === "Juegos"),
        { label: "Más", icon: <MoreHorizIcon />, route: "/mas" } // ruta para desplegar Personas, Resultados, Turnos, Equipos
      ];
    } else if (userRole === 'capitan' || userRole === 'alumno') {
      options = [
        allOptions.find(o => o.label === "Perfil"),
        allOptions.find(o => o.label === "Juegos"),
        allOptions.find(o => o.label === "Resultados")
      ];
    }

    setAllowedOptions(options);

    if (options.length === 0) return;

    // Buscar índice activo actual
    const activeIndex = options.findIndex(option =>
      location.startsWith(option.route)
    );

    if (activeIndex !== -1) {
      setValue(activeIndex);
    } else if ((location === '/dashboard' || location === '/dashboard/') && !hasRedirected.current) {
      hasRedirected.current = true;
      setLocation(options[0].route, { replace: true });
      setValue(0);
    } else {
      setValue(0);
    }
  }, [userRole, location, setLocation]);

  const handleChange = (event, newValue) => {
    const selectedOption = allowedOptions[newValue];
    if (selectedOption) {
      setLocation(selectedOption.route);
      setValue(newValue);
    }
  };

  if (!userRole || allowedOptions.length === 0) return null;

  return (
    <Box
      component="nav"
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 100,
        minHeight: '56px',
        bgcolor: '#f5f7f8',
        boxShadow: 3
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        {allowedOptions.map((option, index) => (
          <BottomNavigationAction
            key={option.route}
            label={option.label}
            icon={option.icon}
            value={index}
            sx={{
              color: location.startsWith(option.route) ? 'primary.main' : 'text.secondary',
              '&.Mui-selected': { color: 'primary.main', fontWeight: 'bold' },
              minWidth: 'auto',
              padding: '6px 4px'
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
