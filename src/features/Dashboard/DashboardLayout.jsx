import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Box } from '@mui/material';
import BarraDeNavegacion from '../common/BarraDeNavegacion';
import React from 'react';

export default function DashboardLayout({ children }) {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    console.log("📍 Current location:", location);
    if (location === "/dashboard" || location === "/dashboard/") {
      console.log("🔄 Redirecting to /dashboard/perfil");
      setLocation("/dashboard/perfil");
    }
  }, [location, setLocation]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', pb: '56px' }}>
      <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#f5f7f8' }}>
        {/* Debug temporal */}
        <div style={{ padding: '20px' }}>
          <h3>Debug Info:</h3>
          <p>Location: {location}</p>
          <p>Children type: {typeof children}</p>
          <p>Children: {React.Children.count(children)}</p>
        </div>
        
        {children}
        <BarraDeNavegacion />
      </Box>
    </Box>
  );
}