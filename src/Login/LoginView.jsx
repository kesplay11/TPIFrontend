// src/pages/Login.jsx
import { useState } from "react";
import { TextField, Button, Box, Typography, Card } from "@mui/material";
import loginService from "../services/Login/Login";
export default function Login() {
const [form, setForm] = useState({ email: "", password: "" });
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Card className="p-8 w-full max-w-md shadow-xl">
        <Typography variant="h5" className="text-center mb-6">
        Iniciar Sesión
        </Typography>
        <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        >
        <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
        />
        <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
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
        >
            {loading ? "Ingresando..." : "Ingresar"}
        </Button>
        </Box>
    </Card>
    </div>
);
}
