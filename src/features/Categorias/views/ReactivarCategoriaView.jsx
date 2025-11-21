// src/features/Dashboard/pages/Categorias/ReactivarCategorias.jsx
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Box, Typography, CircularProgress } from "@mui/material";
import categoriasService from "../../../../services/categorias/CategoriasService";
import CategoriaInactivaCard from "../components/CategoriaInactivaCard";

export default function ReactivarCategoriaView() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useLocation();

    // Cargar solo categorías inactivas (borrado = 1)
    useEffect(() => {
        const fetchInactivas = async () => {
        try {
            const data = await categoriasService.obtenerCategorias(1); // ← traer inactivas
            console.log(data);
            setCategorias(data);
        } catch (error) {
            console.error("Error al cargar categorías inactivas:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchInactivas();
    }, []);

    // Reactivar una categoría
    const handleRestore = async (categoria_id) => {
        try {
        await categoriasService.cambiarEstado(categoria_id, 0); // ← reactivar

        // Quitar de la lista local
        setCategorias((prev) =>
            prev.filter((c) => c.categoria_id !== categoria_id)
        );
        } catch (error) {
        console.error("Error al reactivar categoría:", error);
        }
    };

    if (loading) {
        return (
        <Box className="flex items-center justify-center h-64">
            <CircularProgress />
        </Box>
        );
    }

    return (
        <Box className="p-6">
        <Typography variant="h4" className="font-bold mb-6 text-gray-900 dark:text-white">
            Categorías Inactivas
        </Typography>

        {categorias.length === 0 ? (
            <Typography>No hay categorías inactivas.</Typography>
        ) : (
            <Box className="space-y-4">
            {categorias.map((categoria) => (
                <CategoriaInactivaCard
                key={categoria.categoria_id}
                nombre={categoria.nombre}
                onRestore={() => handleRestore(categoria.categoria_id)}
                />
            ))}
            </Box>
        )}
        </Box>
    );
}
