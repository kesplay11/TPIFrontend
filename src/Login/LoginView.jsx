// src/pages/Login.jsx
import { useState } from "react";
import { TextField, Button, Box, Typography, Card } from "@mui/material";
import loginService from "../services/Login/Login";
import useForm from "../hooks/useForm";

export default function Login() {
    const {values, handleChange, resteForm} =  useForm({
        email: "",
        password: ""
    })

 
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
    const data = await loginService.login(form.email, form.password);
    console.log("Inicio de sesión exitoso:", data);
    window.location.href = "/home"; // Redirección provisional
    } catch (err) {
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
            sx={{fontSize:''}}
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

        >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
        </Button>
        </Box>
    </Card>
    </div>
);
}
