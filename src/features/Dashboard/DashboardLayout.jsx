import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Box } from '@mui/material';
import BarraDeNavegacion from '../common/BarraDeNavegacion';
import { auth } from '../../localStorage/authStorage';

export default function DashboardLayout({ children }) {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // auth.logout();
    console.log("📍 Current location:", location);
    if (location === "/dashboard" || location === "/dashboard/") {
      console.log("🔄 Redirecting to /dashboard/perfil");
      setLocation("/dashboard/perfil");
    }
  }, [location, setLocation]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', pb: '56px' }}>
      <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#f5f7f8' }}>

        {children}

        <BarraDeNavegacion />
      </Box>
    </Box>
  );
}
