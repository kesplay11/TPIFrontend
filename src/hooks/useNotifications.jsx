// hooks/useNotifications.js
import { useState, useEffect, useRef } from 'react';
import { auth } from '../localStorage/authStorage';
import io from 'socket.io-client';

export function useNotifications() {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [isConnected, setIsConnected] = useState(false); // 🟢 Estado de conexión
  const socketRef = useRef(null);

  useEffect(() => {
    const initializeSocket = setTimeout(() => {
      const currentUser = auth.getUser();
      
      if (!currentUser) {
        console.log('❌ No hay usuario autenticado');
        return;
      }

      console.log('🔔 Configurando notificaciones para usuario:', currentUser);

      if (!currentUser.persona_id) {
        console.error('💥 ERROR: persona_id es undefined.');
        return;
      }

      try {
        const backendUrl = 'http://localhost:5000';
        console.log(`🔗 Conectando a WebSocket: ${backendUrl}`);
        
        socketRef.current = io(backendUrl, {
          transports: ['websocket', 'polling'],
          timeout: 10000
        });

        const socket = socketRef.current;

        socket.on('connect', () => {
          console.log('✅ Conectado al servidor WebSocket');
          setIsConnected(true); // 🟢 Actualizar estado
        });

        socket.on('connect_error', (error) => {
          console.error('❌ Error de conexión WebSocket:', error.message);
          setIsConnected(false);
        });

        socket.on('disconnect', () => {
          console.log('🔌 Desconectado del servidor');
          setIsConnected(false);
        });

        // 🟢 Eventos para coordinadores
        if (currentUser.rol_id === 1) {
          socket.on('nuevo_punto', (data) => {
            console.log('📨 Nuevo punto recibido:', data);
            showNotification(data.mensaje, 'info');
          });

          socket.on('punto_reenviado', (data) => {
            console.log('📨 Punto reenviado recibido:', data);
            showNotification(data.mensaje, 'warning');
          });
        }

        // 🟢 Eventos para capitanes
        if (currentUser.rol_id === 2) {
          socket.on('punto_confirmado', (data) => {
            console.log('📨 Punto confirmado recibido:', data);
            showNotification(`✅ ${data.mensaje}`, 'success');
          });

          socket.on('punto_rechazado', (data) => {
            console.log('📨 Punto rechazado recibido:', data);
            showNotification(`❌ ${data.mensaje}`, 'error');
          });
        }

      } catch (error) {
        console.error('💥 Error crítico:', error);
      }
    }, 500);

    return () => {
      clearTimeout(initializeSocket);
      if (socketRef.current) {
        socketRef.current.disconnect();
        setIsConnected(false);
      }
    };
  }, []);

  const showNotification = (message, severity = 'info') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return {
    notification,
    handleClose,
    isConnected // 🟢 Devolver el estado de conexión
  };





  
}