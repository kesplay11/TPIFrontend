import { useState } from "react";
import { TextField, Button, Box, Typography, Card } from "@mui/material";
import loginService from "../../services/Login/Login";
import useForm from "../../hooks/useForm";
import { useLocation } from "wouter"; 
import { auth } from "../../localStorage/localstorage"; 
import { CircularProgress } from '@mui/material'; // Importamos CircularProgress

export default function Login() {

    const {values, handleChange} = useForm({
        email: "",
        password: ""
    })

    const [, setLocation] = useLocation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 1. Llama al servicio, que guarda el token, rol y es_primer_login
            const data = await loginService.login(values.email, values.password);
            
            const { es_primer_login } = data;
            
            let targetRoute = "/login"; // Default fallback
            
            // 2. Decide la redirección: A Contraseña (si es nuevo) o al Dashboard Único (si no lo es)
            if (es_primer_login === true){
                // Primer login: forzamos a crear la contraseña
                targetRoute = "/crear-contrasena";
            } else {
                // Login recurrente: todos van al mismo dashboard
                targetRoute = "/dashboard";
            }
            
            // Redirige al destino con reemplazo para que no puedan volver al login con el botón de atrás
            setLocation(targetRoute, {replace: true});

        } catch (err) {
            // Manejo de error de login
            setError("Correo o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-withe-100 w-full border-none shadow-none outline-none">
        <Card className="p-4 w-full max-w-md border-none shadow-none outline-none" sx={{boxShadow: 'none', border: 'none'}}>
            <Typography color="primary" variant="h2" className="p-7 text-center mb-6" sx={{ fontFamily: "'Pacifico', cursive", border: "none"}}>
                Intertecnos App
            </Typography>
            <Box
            component="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mg-40px"
            >
            <TextField
                variant="filled"
                label="Correo electrónico"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                variant="filled"
                label="Contraseña"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                fullWidth
                required
                sx={{fontSize:"30px"}}
            />

            {error && (
                <Typography color="error" className="text-center">
                {error}
                </Typography>
            )}

            <Button 
                type="submit"
                variant="contained"
                disabled={loading}
                color="primary"
                sx={{ textTransform: "none", fontSize:"23px" }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
                {loading ? "Ingresando..." : "Iniciar Sesión"}
            </Button>
            </Box>
        </Card>
        </div>
    );
}