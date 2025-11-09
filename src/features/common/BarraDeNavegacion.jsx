import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { auth } from '../../localStorage/localstorage';

// Íconos
import StarIcon from '@mui/icons-material/Star';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';

// Opciones de navegación
const navigationOptions = [
  {
    label: "Perfil",
    icon: <AccountCircleIcon />,
    route: "/perfil",
    roles: ['alumno', 'capitan', 'coordinador']
  },
  {
    label: "Juegos",
    icon: <SportsEsportsIcon />,
    route: "/juegos",
    roles: ['alumno', 'capitan', 'coordinador']
  },
  {
    label: "Personas",
    icon: <StarIcon />,
    route: "/personas",
    roles: ['coordinador']
  }
];

export default function BarraDeNavegacion() {
  const [value, setValue] = useState(0);
  const [allowedOptions, setAllowedOptions] = useState([]);
  const [location, setLocation] = useLocation();
  const hasRedirected = useRef(false);

  const userRole = auth.getUserRole() || '';
  console.log('Rol detectado en barra:', userRole);

  useEffect(() => {
    // Filtrar opciones por el rol del usuario
    const filtered = navigationOptions.filter(option =>
      option.roles.includes(userRole)
    );
    setAllowedOptions(filtered);

    if (filtered.length === 0) return;

    // Buscar índice activo actual
    const activeIndex = filtered.findIndex(option =>
      location.startsWith(option.route)
    );

    if (activeIndex !== -1) {
      // Ruta actual coincide con una pestaña
      setValue(activeIndex);
    } else if (
      (location === '/dashboard' || location === '/dashboard/') &&
      !hasRedirected.current
    ) {
      // Redirigir solo UNA VEZ desde /dashboard
      hasRedirected.current = true;
      const initialRoute = filtered[0].route;
      console.log(`Navegación inicial: /dashboard → ${initialRoute}`);
      setLocation(initialRoute, { replace: true });
      setValue(0);
    } else {
      // Si estás en una ruta no controlada, mantener value en 0
      setValue(0);
    }
  }, [userRole, location, setLocation]);

  const handleChange = (event, newValue) => {
    const selectedOption = allowedOptions[newValue];
    console.log("➡️ setLocation hacia:", selectedOption.route, "desde:", location);

    if (selectedOption) {
      setLocation(selectedOption.route);
      setValue(newValue);
    }
  };

  if (!userRole || allowedOptions.length === 0) return null;

  return (
    <Box
      component="nav"
      className="bg-[#f5f7f8] shadow-2xl"
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 100,
        minHeight: '56px'
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{ bgcolor: '#f5f7f8' }}
      >
        {allowedOptions.map((option, index) => (
          <BottomNavigationAction
            key={option.route}
            label={option.label}
            icon={option.icon}
            value={index}
            sx={{
              color: location.startsWith(option.route)
                ? 'primary.main'
                : 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 'bold'
              },
              minWidth: 'auto',
              padding: '6px 4px'
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
