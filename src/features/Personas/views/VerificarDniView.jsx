// src/components/personas/VerificarDocumento.jsx
import React, { useState } from "react";
import { TextField, Button, Box, Typography, Card, CircularProgress } from "@mui/material";
import { useLocation } from "wouter"; 
import personasService from "../../../services/personas/PersonasServices";
import useForm from "../../../hooks/useForm";
import ModalPersonasReactivar from "../components/ModalPersonasReactivar";
import LayoutSubView from "../../common/LayoutSubView";

export default function VerificarDocumento() {
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
        showConfirm: false,
        onConfirm: null,
    });

    // Función para manejar la confirmación de reactivación
    const handleReactivationConfirmation = async (shouldReactivate) => {
        // Cerrar el modal de confirmación inmediatamente
        setModalState(prev => ({ ...prev, isOpen: false }));

        if (!shouldReactivate) {
            // El usuario dijo "No" - Mostrar mensaje de cancelación
            setTimeout(() => {
                setModalState({
                    isOpen: true,
                    title: 'Cancelado',
                    message: 'Reactivación cancelada. Intente con otro documento o continúe el registro de un nuevo usuario.',
                    showConfirm: false,
                    onConfirm: null,
                });
            }, 300);
            return;
        }

        // El usuario dijo "Sí" - Proceder con reactivación
        setLoading(true);
        try {
            await personasService.cambiarEstadoPorDni(values.documento, 0); 
            
            // Mostrar modal de éxito
            setModalState({
                isOpen: true,
                title: 'Éxito',
                message: 'Usuario reactivado correctamente. Será redirigido al panel principal.',
                showConfirm: false,
                onConfirm: null,
            });
        } catch (error) {
            setModalState({
                isOpen: true,
                title: 'Error de Reactivación',
                message: 'No se pudo reactivar el usuario. Intente nuevamente.',
                showConfirm: false,
                onConfirm: null,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const dni = values.documento.trim();

        if (!dni || dni.length < 5) {
            setError("Debe ingresar un número de documento válido (mínimo 5 dígitos).");
            setLoading(false);
            return;
        }

        try {
            const response = await personasService.verificarDNI(dni);

            if (response.puedeCrear) {
                // Caso 1: No Registrado -> Redirigir a Crear Usuario
                setLocation("/dashboard/mas/personas/crear-usuario", { replace: true });

            } else if (response.puedeReactivar) {
                // Caso 2: Borrado Lógico -> Pedir confirmación
                setModalState({ 
                    isOpen: true,
                    title: 'Atención',
                    message: response.message,
                    showConfirm: true,
                    onConfirm: handleReactivationConfirmation,
                });

            } else {
                // Caso 3: Ya Registrado (Activo) -> Mostrar error
                setModalState({
                    isOpen: true,
                    title: 'Usuario Ya Registrado',
                    message: response.message,
                    showConfirm: false,
                    onConfirm: null,
                });
            }

        } catch (err) {
            console.error("Error al verificar documento:", err);
            setError("Ocurrió un error de conexión al verificar el documento. Intente nuevamente.");
        } finally {
            // Solo detener loading si no estamos en proceso de confirmación
            if (!modalState.showConfirm) {
                setLoading(false);
            }
        }
    };

    // Función para cerrar modales simples
    const handleCloseModal = () => {
        setModalState(prev => ({ ...prev, isOpen: false }));
        
        // Si es el modal de éxito, redirigir después de cerrar
        if (modalState.title === 'Éxito') {
            setTimeout(() => {
                setLocation("/dashboard", { replace: true });
            }, 300);
        }
    };

    return (
        <LayoutSubView title={"Verificación del DNI"}>
            {/* Modal para mensajes y confirmaciones */}
            <ModalPersonasReactivar
                isOpen={modalState.isOpen}
                title={modalState.title}
                message={modalState.message}
                onClose={handleCloseModal}
                onConfirm={modalState.onConfirm}
                showConfirm={modalState.showConfirm}
            />

            <Card className="p-6" sx={{ boxShadow: 3 }}>
                
                {/* Título */}
                <Typography 
                    color="primary" 
                    variant="h4" 
                    className="text-center mb-2 font-bold"
                >
                    Verificación de Usuario
                </Typography>
                
                <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    className="text-center mb-6"
                >
                    Ingrese su documento para verificar el estado
                </Typography>
                
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    {/* Campo de Documento (DNI) */}
                    <TextField
                        variant="outlined"
                        label="Número de Documento (DNI)"
                        name="documento"
                        type="tel"
                        value={values.documento}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={loading}
                        helperText="Ingrese solo los dígitos de su DNI"
                        error={!!error}
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
                        size="large"
                        sx={{ 
                            textTransform: "none", 
                            fontSize: "16px", 
                            marginTop: "16px",
                            py: 1.5
                        }}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loading ? "Verificando..." : "Verificar Documento"}
                    </Button>
                </Box>
            </Card>
        </LayoutSubView>
    );
}