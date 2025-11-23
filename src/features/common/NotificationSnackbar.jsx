// components/NotificationSnackbar.jsx
import { Snackbar, Alert } from "@mui/material";

export default function NotificationSnackbar({ notification, onClose }) {
  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert 
        onClose={onClose} 
        severity={notification.severity} 
        variant="filled"
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}