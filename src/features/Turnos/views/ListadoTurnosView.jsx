// src/features/Dashboard/pages/Categorias/ListadoCategorias.jsx
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import  TurnoCard  from "../components/TurnoCard";
import ConfirmacionModal from "../../Personas/components/ConfirmacionModal";
import turnoService from "../../../../services/Turnos/TurnosService";

export default function ListadoTurnosView() {
    const [location, setLocation] = useLocation();
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTurno, setSelectedTurno] = useState(null);
    const [modalLoading, setModalLoading]  = useState(false);

    // ✅ Cargar categorías al montar
    useEffect(() => {
        const fetchTurnos = async () => {
        try {
            const data = await turnoService.obtenerTurnos();
            setTurnos(data);
        } catch (err) {
            console.error("Error al cargar turnos:", err);
        } finally {
            setLoading(false);
        }
        };
        fetchTurnos();
    }, []);

    // 🧩 Abrir modal de confirmación
    const handleDeleteClick = (turno) => {
        setSelectedTurno(turno);
        setModalOpen(true);
    };

    // ⚡ Confirmar eliminación
    const handleConfirmDelete = async (confirmed) => {
        if (!confirmed) {
        setModalOpen(false);
        setSelectedTurno(null);
        return;
        }

        setModalLoading(true);
        try {
        await turnoService.cambiarEstado(selectedTurno.turno_id, 1);
        setTurnos((prev) => prev.filter((t) => t.turno_id !== selectedTurno.turno_id));
        } catch (err) {
        console.error("Error al eliminar Turno:", err);
        } finally {
        setModalLoading(false);
        setModalOpen(false);
        setSelectedTurno(null);
        }
    };

    // ✏️ Editar categoría (por ahora logueamos)
    const handleEditClick = (turno_id) => {
        console.log(turno_id)
            // Redirigir a la vista de edición, pasando el ID como prop
            setLocation(`/dashboard/mas/turnos/editar-turno/${turno_id}`); 
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
            Listado de Turnos
        </Typography>

        {turnos.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
            No hay turnos registrados.
            </Typography>
        ) : (
            <Box className="space-y-4">
                nombre, horaInicio, horaFin, onEdit, onDelete
            {turnos.map((turno) => (
                <TurnoCard
                key={turno.turno_id}
                nombre={turno.nombre}
                horaInicio={turno.hora_inicio}
                horaFin={turno.hora_fin}
                onEdit={() => handleEditClick(turno.turno_id)}
                onDelete={() => handleDeleteClick(turno)}
                />
            ))}
            </Box>
        )}

        {/* 🔥 Modal reutilizable */}
        <ConfirmacionModal
            isOpen={modalOpen}
            title="Confirmar Borrado"
            message={
            selectedTurno
                ? `¿Seguro que deseas eliminar la categoría "${selectedTurno.nombre}"?`
                : ""
            }
            onConfirm={handleConfirmDelete}
            onClose={() => setModalOpen(false)}
            isLoading={modalLoading}
        />
        </Box>
    );
}
