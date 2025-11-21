import { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import io from "socket.io-client";

const socket = io();

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info"
  });

  useEffect(() => {
    socket.off("nuevo_punto");
    socket.off("punto_confirmado");
    socket.off("punto_rechazado");

    socket.on("nuevo_punto", (data) => {
      showNotification(data.mensaje, "info");
    });

    socket.on("punto_confirmado", (data) => {
      showNotification(`CONFIRMADO: ${data.mensaje}`, "success");
    });

    socket.on("punto_rechazado", (data) => {
      showNotification(`RECHAZADO: ${data.mensaje}`, "error");
    });
  }, []);

  const showNotification = (message, severity = "info") => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={notification.severity} variant="filled">
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
