// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Card } from "@mui/material";
import useForm from "../../hooks/useForm";
import { useLocation } from "wouter"; 
import { auth } from "../../localStorage/localstorage";
import personasService from "../../services/personas/PersonasServices";

export default function SetPassword() {
    const { values, handleChange, resetForm } = useForm({
        nueva: "",
        repetir: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [personaId, setPersonaId] = useState(null);
    const [, setLocation] = useLocation();

    // Obtener el ID del usuario logueado
    useEffect(() => {
        const userId = auth.getUserID(); // Asegúrate de que esta función exista
        if (userId) {
            setPersonaId(userId);
        } else {
            setError("No se pudo identificar al usuario");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!personaId) {
            setError("No se pudo identificar al usuario");
            setLoading(false);
            return;
        }

        if (values.nueva !== values.repetir) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        if (values.nueva.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            setLoading(false);
            return;
        }

        try {
            // PASA EL persona_id Y la nueva contraseña
            await personasService.setPassword(personaId, values.nueva);

            setSuccess(true);
            
            // Remover flag de primer login
            localStorage.removeItem('es_primer_login');

            // Redirigir después de éxito
            setTimeout(() => {
                const userRole = auth.getUserRole();
                let targetRoute = "/dashboard/perfil"; // Ruta por defecto
                
                // Opcional: redirigir según rol
                switch (userRole) {
                    case 'coordinador': 
                    case 'capitan': 
                    case 'alumno': 
                    default: 
                        targetRoute = "/dashboard/perfil";
                }
                
                setLocation(targetRoute, { replace: true });
            }, 1500);

        } catch (err) {
            console.error("Error al actualizar la contraseña", err);
            setError(err.response?.data?.message || "Error al actualizar la contraseña");
        } finally {
            if (!success) setLoading(false);
        }
    };

    if (!personaId && !error) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
            <Card className="p-8 w-full max-w-md shadow-none">
                <Typography variant="h5" className="text-center mb-6">
                    Crear Nueva Contraseña 🔐
                </Typography>
                {success ? (
                    <Typography color="primary" className="text-center">
                        ✅ Contraseña actualizada. Redirigiendo...
                    </Typography>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <TextField
                            label="Nueva contraseña"
                            type="password"
                            name="nueva"
                            value={values.nueva}
                            onChange={handleChange}
                            fullWidth
                            required
                            autoComplete="new-password"
                        />
                        <TextField
                            label="Repetir contraseña"
                            type="password"
                            name="repetir"
                            value={values.repetir}
                            onChange={handleChange}
                            fullWidth
                            required
                            autoComplete="new-password"
                        />
                        {error && (
                            <Typography color="error" className="text-center">
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            sx={{ textTransform: "none" }}
                        >
                            {loading ? "Actualizando..." : "Guardar contraseña"}
                        </Button>
                    </Box>
                )}
            </Card>
        </div>
    );
}