// src/pages/Login.jsx
import { useState } from "react";
import { TextField, Button, Box, Typography, Card } from "@mui/material";
import PersonasServices from "../../services/personas/PersonasServices";
import useForm from "../../hooks/useForm";
import { useLocation } from "wouter"; 
import { auth } from "../../localStorage/localstorage";
import personasService from "../../services/personas/PersonasServices";

export default function SetPassword() {
    const {values, handleChange, resteForm} =  useForm({
        nueva: "",
        repetir: ""
    })



const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState(false);
const [, setLocation] = useLocation();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if(values.nueva !== values.repetir){
        setError("Las contraseñas no coinciden")
        setLoading(false);
        return
    }

    try {

    await personasService.setPassword(values.nueva);

    setSuccess(true);
    
    localStorage.removeItem('es_primer_login');

    const userRole = auth.getUserRole();
    let targetRoute = "/login";

    switch (userRole) {
        case 'coordinador': targetRoute = "/coordinador/dashboard"; break;
        case 'capitan': targetRoute = "/capitan/dashboard"; break;
        case 'alumno': targetRoute = "/alumno/dashboard"; break;
    }

    setTimeout(() => setLocation(targetRoute, {replace: true}), 1500);

    } catch (err) {
        console.error("Error al acutalizar la contraseña", err)
        setError("Correo o contraseña incorrectos");
    } finally {
        if(!success) setLoading(false);
    }
};

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
                        />
                        <TextField
                            label="Repetir contraseña"
                            type="password"
                            name="repetir"
                            value={values.repetir}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        {error && <Typography color="error">{error}</Typography>}
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
