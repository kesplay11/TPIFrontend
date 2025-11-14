// src/features/Dashboard/pages/Categorias/ListadoCategorias.jsx
import { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import EquipoCard from "../components/EquipoCard";
import CategoriaCard from "../componets/CategoriaCard";
import ConfirmacionModal from "../../Personas/components/ConfirmacionModal";
import equiposService from "../../../../services/equipos/EquiposService";
import categoriasService from "../../../../services/categorias/CategoriasService"

export default function ListadoCategorias() {
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEquipo, setSelectedEquipos] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    // ✅ Cargar categorías al montar
    useEffect(() => {
        const fetchCategorias = async () => {
        try {
            const data = await equiposService.obtenerEquipos();
            setEquipos(data);
        } catch (err) {
            console.error("Error al cargar categorías:", err);
        } finally {
            setLoading(false);
        }
        };
        fetchCategorias();
    }, [equipos]);

    // 🧩 Abrir modal de confirmación
    const handleDeleteClick = (equipo) => {
        setSelectedCategoria(equipo);
        setModalOpen(true);
    };

    // ⚡ Confirmar eliminación
    const handleConfirmDelete = async (confirmed) => {
        if (!confirmed) {
        setModalOpen(false);
        setSelectedCategoria(null);
        return;
        }

        setModalLoading(true);
        try {
            await equiposService.cambiarEstado(selectedEquipo.equipo_id, 1);
            setEquipos((prev) => prev.filter((e) => e.id !== selectedEquipo.equipo_id));
        } catch (err) {
        console.error("Error al eliminar categoría:", err);
        } finally {
        setModalLoading(false);
        setModalOpen(false);
        setSelectedEquipos(null);
        }
    };

    // ✏️ Editar categoría (por ahora logueamos)
    const handleEditClick = (equipo_id) => {
        console.log(equipo_id)
            // Redirigir a la vista de edición, pasando el ID como prop
            setLocation(`/dashboard/mas/equipos/editar-equipo/${equipo_id}`); 
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
            Listado de Equipos
        </Typography>

        {categorias.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
            No hay Equipos Registrados.
            </Typography>
        ) : (
            <Box className="space-y-4">
            {equipos.map((equipo) => (
                <CategoriaCard
                key={equipo.equipo_id}
                nombre={equipo.nombre}
                onEdit={() => handleEditClick(equipo)}
                onDelete={() => handleDeleteClick(equipo)}
                />
            ))}
            </Box>
        )}

        {/* 🔥 Modal reutilizable */}
        <ConfirmacionModal
            isOpen={modalOpen}
            title="Confirmar Borrado"
            message={
            selectedEquipo
                ? `¿Seguro que deseas eliminar la categoría "${selectedEquipo.nombre}"?`
                : ""
            }
            onConfirm={handleConfirmDelete}
            onClose={() => setModalOpen(false)}
            isLoading={modalLoading}
        />
        </Box>
    );
}
