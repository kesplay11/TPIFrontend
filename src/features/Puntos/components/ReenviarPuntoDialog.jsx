import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Typography
} from "@mui/material";

export default function ReenviarPuntoDialog({
    open,
    onClose,
    punto,
    values,
    errors,
    handleChange,
    reenviando,
    mensajeExito,
    onReenviar
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Reenviar Puntos Rechazados
            </DialogTitle>
            <DialogContent>
                {mensajeExito ? (
                    <Alert severity="success" className="mb-4">
                        {mensajeExito}
                    </Alert>
                ) : (
                    <>
                        <Typography variant="body2" className="mb-4 text-gray-600">
                            Estás reenviando puntos para: <strong>{punto?.nombre_categoria}</strong> - Ronda {punto?.numero_ronda}
                        </Typography>
                        
                        <TextField
                            label="Nuevos Puntos"
                            name="nuevosPuntos"
                            type="number"
                            value={values.nuevosPuntos}
                            onChange={handleChange}
                            error={!!errors.nuevosPuntos}
                            helperText={errors.nuevosPuntos}
                            fullWidth
                            variant="outlined"
                        />
                        
                        <Typography variant="body2" className="mt-2 text-gray-500">
                            Al reenviar, el punto volverá a estado "Pendiente" para revisión.
                        </Typography>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                {!mensajeExito && (
                    <>
                        <Button onClick={onClose} disabled={reenviando}>
                            Cancelar
                        </Button>
                        <Button 
                            onClick={onReenviar} 
                            variant="contained"
                            disabled={reenviando}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {reenviando ? <CircularProgress size={24} /> : "Reenviar Puntos"}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}