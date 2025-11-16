// src/features/Dashboard/pages/Categorias/ReactivarCategorias.jsx
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Box, Typography, CircularProgress } from "@mui/material";
import equiposService from "../../../../services/equipos/EquiposService";
import CategoriaInactivaCard from "../../Categorias/components/CategoriaInactivaCard"

export default function ReactivarEquiposView() {
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useLocation();

    // Cargar solo categorías inactivas (borrado = 1)
    useEffect(() => {
        const fetchInactivas = async () => {
        try {
            const data = await equiposService.obtenerEquipos(1); // ← traer inactivas
            console.log(data);
            setEquipos(data);
        } catch (error) {
            console.error("Error al cargar los equipos inactivos:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchInactivas();
    }, []);

    // Reactivar una categoría
    const handleRestore = async (equipo_id) => {
        try {
        await equiposService.cambiarEstado(equipo_id, 0); // ← reactivar

        // Quitar de la lista local
        setEquipos((prev) =>
            prev.filter((e) => e.equipo_id !== equipo_id)
        );
        } catch (error) {
        console.error("Error al reactiva el equipo:", error);
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
            Equipos Inactivos
        </Typography>

        {equipos.length === 0 ? (
            <Typography>No hay categorías inactivas.</Typography>
        ) : (
            <Box className="space-y-4">
            {equipos.map((equipo) => (
                <CategoriaInactivaCard
                key={equipo.equipo_id}
                nombre={equipo.nombre}
                onRestore={() => handleRestore(equipo.equipo_id)}
                />
            ))}
            </Box>
        )}
        </Box>
    );
}
