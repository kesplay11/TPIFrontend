import { Card, Typography, Button, Box, CircularProgress } from '@mui/material';

/**
 * Componente Modal para solicitar confirmación antes de una acción destructiva (ej: Borrado Lógico).
 *
 * @param {object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Indica si el modal debe estar visible.
 * @param {string} props.title - Título del modal.
 * @param {string} props.message - Mensaje descriptivo para la acción.
 * @param {function} props.onConfirm - Función a llamar si el usuario confirma (recibe un booleano, true para confirmar).
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {boolean} props.isLoading - Muestra un spinner si la acción está en progreso.
 * @returns {JSX.Element}
 */


export default function ConfirmacionModal({ isOpen, title, message, onConfirm, onClose, isLoading }) {
    if (!isOpen) return null;

    // Llama a onConfirm(true) si se presiona "Confirmar"
    const handleConfirm = () => {
        if (!isLoading) {
            onConfirm(true);
        }
    };

    // Llama a onConfirm(false) o onClose si se presiona "Cancelar"
    const handleCancel = () => {
        if (!isLoading) {
            onConfirm(false); // Enviamos 'false' si cancela, y el padre manejará el cierre
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-sm p-6 rounded-xl" sx={{ boxShadow: 8 }}>
                <Typography variant="h5" className="mb-4 font-bold text-center" color="error">
                    {title}
                </Typography>
                <Typography variant="body1" className="mb-6 text-center">
                    {message}
                </Typography>
                
                <Box className="flex justify-end gap-3">
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={handleCancel}
                        disabled={isLoading}
                        sx={{ textTransform: "none" }}
                    >
                        {isLoading ? 'Cerrando...' : 'Cancelar'}
                    </Button>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleConfirm}
                        disabled={isLoading}
                        sx={{ textTransform: "none" }}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {isLoading ? 'Borrando...' : 'Confirmar Borrado'}
                    </Button>
                </Box>
            </Card>
        </div>
    );
}