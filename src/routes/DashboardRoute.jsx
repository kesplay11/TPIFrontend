// DashboardRoute.jsx - CORREGIDO
import { useEffect, useState } from 'react';
import ProtectedRoute from "./ProtectedRoute";
import NotificationSnackbar from '../features/common/NotificationSnackbar';
import DashboardLayout from "../features/Dashboard/DashboardLayout";
import { useNotifications } from "../hooks/useNotifications";
import { auth } from "../localStorage/authStorage"; // 🟢 IMPORTAR AUTH

export default function DashboardRoute({ children }) {
  const { notification, handleClose, isConnected } = useNotifications();
  const [userReady, setUserReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth.getUser();
      if (user && user.persona_id) {
        setUserReady(true);
        console.log('✅ Usuario listo para notificaciones:', user);
      } else {
        console.log('❌ Usuario no está listo:', user);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  console.log('🔍 Estado de conexión:', { isConnected, userReady });

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {children}
        <NotificationSnackbar 
          notification={notification} 
          onClose={handleClose} 
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
}