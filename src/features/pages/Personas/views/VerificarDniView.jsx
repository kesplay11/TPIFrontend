import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Card, CircularProgress } from "@mui/material";
import { useLocation, Link } from "wouter"; 
import personasService from "../../../../services/personas/PersonasServices";
import useForm from "../../../../hooks/useForm";

// ====================================================================
// MOCKS Y UTILIDADES (Para que el archivo sea autocontenido)
// NOTA: En tu proyecto real, estas dependencias serían importaciones.
// ====================================================================

// COMPONENTE: Modal Personalizado (Reemplazo de alert/confirm)
const Modal = ({ title, message, isOpen, onClose, onConfirm, showConfirm = false }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-sm p-6" sx={{ borderRadius: 2 }}>
                <Typography variant="h5" className="mb-4 font-bold text-center" sx={{ color: 'primary.main' }}>
                    {title}
                </Typography>
                <Typography variant="body1" className="mb-6 text-center">
                    {message}
                </Typography>
                <Box className="flex justify-end gap-2">
                    {showConfirm && (
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            onClick={() => { onClose(); if (onConfirm) onConfirm(false); }}
                            sx={{ textTransform: "none" }}
                        >
                            No
                        </Button>
                    )}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => { 
                            if (showConfirm) {
                                // En confirmación, cerramos y llamamos a onConfirm(true)
                                onConfirm(true); 
                            } else {
                                // En mensaje simple, solo cerramos
                                onClose();
                            }
                        }}
                        sx={{ textTransform: "none" }}
                    >
                        {showConfirm ? "Sí, Reactivar" : "Aceptar"}
                    </Button>
                </Box>
            </Card>
        </div>
    );
};
// ====================================================================
// FIN DE MOCKS
// ====================================================================


export default function VerificarDocumento() {
    // Estado del formulario (solo necesita el documento)
    const { values, handleChange } = useForm({
        documento: ""
    });

    const [, setLocation] = useLocation();

    // Estados de control
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        isConfirmation: false,
        onConfirm: null, // Función que se llama al confirmar
    });

    // Función para manejar la confirmación de reactivación
    const handleReactivationConfirmation = async (shouldReactivate) => {
        // Opcional: Cerrar el modal de confirmación
        setModalState({ isOpen: false, title: '', message: '', isConfirmation: false, onConfirm: null });

        if (!shouldReactivate) {
            // El usuario dijo "No"
            setModalState({
                isOpen: true,
                title: 'Cancelado',
                message: 'Reactivación cancelada. Intente con otro documento o continúe el registro de un nuevo usuario.',
                isConfirmation: false,
                onClose: () => setModalState({ isOpen: false })
            });
            return;
        }

        // El usuario dijo "Sí"
        setLoading(true);
        try {
            // Llama al servicio para reactivar (borrado_logico: 0)
            await personasService.cambiarEstadoPorDni(values.documento, 0); 
            
            // Mostrar modal de éxito
            setModalState({
                isOpen: true,
                title: 'Éxito',
                message: 'Usuario reactivado correctamente. Será redirigido al panel principal.',
                isConfirmation: false,
                onClose: () => {
                    setModalState({ isOpen: false });
                    // Redirigir al destino después de la reactivación exitosa
                    setLocation("/dashboard", { replace: true });
                }
            });
        } catch (error) {
            setModalState({
                isOpen: true,
                title: 'Error de Reactivación',
                message: 'No se pudo reactivar el usuario. Intente nuevamente.',
                isConfirmation: false,
                onClose: () => setModalState({ isOpen: false })
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        // Aseguramos que cualquier modal anterior esté cerrado al iniciar
        setModalState({ isOpen: false, title: '', message: '', isConfirmation: false, onConfirm: null });

        const dni = values.documento;

        if (!dni || dni.length < 5) {
            setError("Debe ingresar un número de documento válido.");
            setLoading(false);
            return;
        }

        try {
            const response = await personasService.verificarDNI(dni);

            if (response.puedeCrear) {
                // Caso 3: No Registrado -> Redirigir a Crear Usuario
                setLocation("/dashboard/personas/usuarios", { replace: true });

            } else if (response.puedeReactivar) {
                // Caso 2: Borrado Lógico -> Pedir confirmación (Modal de confirmación)
                setModalState({ 
                    isOpen: true,
                    title: 'Atención',
                    message: response.message, // "La persona existe pero está dada de baja. ¿Desea reactivarla?"
                    isConfirmation: true,
                    onConfirm: handleReactivationConfirmation,
                    onClose: () => setModalState({ isOpen: false })
                });

            } else {
                // Caso 1: Ya Registrado (Activo) -> Mostrar error/mensaje (Modal simple)
                setModalState({
                    isOpen: true,
                    title: 'Error de Registro',
                    message: response.message, // "La persona ya está registrada en el sistema."
                    isConfirmation: false,
                    onClose: () => setModalState({ isOpen: false })
                });
            }

        } catch (err) {
            setError("Ocurrió un error de conexión al verificar el documento.");
        } finally {
            // El loading solo se desactiva aquí si no entramos a handleReactivationConfirmation
            if (!modalState.isConfirmation) {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-withe-100 w-full border-none shadow-none outline-none">
            
            {/* Modal para mensajes y confirmaciones */}
            <Modal 
                title={modalState.title}
                message={modalState.message}
                isOpen={modalState.isOpen}
                onClose={modalState.onClose}
                onConfirm={modalState.onConfirm}
                showConfirm={modalState.isConfirmation}
            />

            <Card className="p-4 w-full max-w-md border-none shadow-none outline-none" sx={{boxShadow: 'none', border: 'none'}}>
                
                {/* Título - Estilo idéntico al componente Login */}
                <Typography color="primary" variant="h5" className="p-7 text-center mb-6" >
                    Verificación de Usuario
                </Typography>
                
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mg-40px"
                >
                    {/* Campo de Documento (DNI) */}
                    <TextField
                        variant="filled"
                        label="Número de Documento (DNI)"
                        name="documento"
                        type="tel"
                        value={values.documento}
                        onChange={handleChange}
                        fullWidth
                        required
                        helperText="Ingrese solo los dígitos de su DNI"
                    />

                    {error && (
                        <Typography color="error" className="text-center font-medium">
                            {error}
                        </Typography>
                    )}

                    {/* Botón de Verificación */}
                    <Button 
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        color="primary"
                        sx={{ textTransform: "none", fontSize:"23px", marginTop: "16px" }}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loading ? "Verificando..." : "Verificar Documento"}
                    </Button>
                

                </Box>
            
            </Card>
        </div>
    );
}