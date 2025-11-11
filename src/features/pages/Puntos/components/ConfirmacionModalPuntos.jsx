import { Card, Typography, Button, Box, CircularProgress } from '@mui/material';

export default function ConfirmacionModalPuntos({
  isOpen,
  title,
  message,
  onConfirm,
  onClose,
  isLoading,
  confirmLabel = "Confirmar",
}) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!isLoading) onConfirm(true);
  };

  const handleCancel = () => {
    if (!isLoading) onConfirm(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6 rounded-xl" sx={{ boxShadow: 8 }}>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" align="center" sx={{ mb: 4 }}>
          {message}
        </Typography>

        <Box display="flex" justifyContent="end" gap={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? "Procesando..." : confirmLabel}
          </Button>
        </Box>
      </Card>
    </div>
  );
}
