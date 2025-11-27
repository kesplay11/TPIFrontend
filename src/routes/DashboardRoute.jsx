import { useEffect, useState } from 'react';
import ProtectedRoute from "./ProtectedRoute";
import NotificationSnackbar from '../features/common/NotificationSnackbar';
import DashboardLayout from "../features/Dashboard/DashboardLayout";
import { useNotifications } from "../hooks/useNotifications";

export default function DashboardRoute({ 
  children, 
  requiredRoles = [], 
  isSetPasswordRoute = false 
}) {
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

  return (
    <ProtectedRoute 
      requiredRoles={requiredRoles} 
      isSetPasswordRoute={isSetPasswordRoute}
    >
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