// src/features/Dashboard/pages/Equipos/ListadoEquipos.jsx
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import LayoutSubView from "../../common/LayoutSubView";
import CategoriaCard from "../../Categorias/components/CategoriaCard";
import ConfirmacionModal from "../../Personas/components/ConfirmacionModal";
import equiposService from "../../../services/equipos/EquiposService";

export default function ListadoEquipos() {
  const [, setLocation] = useLocation();

  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // ✅ Cargar equipos
  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const data = await equiposService.obtenerEquipos(); // solo activos
        console.log()
        setEquipos(data);
      } catch (err) {
        console.error("Error al cargar equipos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipos();
  }, []);

  // 🧩 Abrir modal
  const handleDeleteClick = (equipo) => {
    setSelectedEquipo(equipo);
    setModalOpen(true);
  };

  // ⚡ Confirmar eliminación
  const handleConfirmDelete = async (confirmed) => {
    if (!confirmed) {
      setModalOpen(false);
      setSelectedEquipo(null);
      return;
    }

    setModalLoading(true);
    try {
      await equiposService.cambiarEstado(selectedEquipo.equipo_id, 1);

      // Eliminar visualmente
      setEquipos((prev) =>
        prev.filter((e) => e.equipo_id !== selectedEquipo.equipo_id)
      );
    } catch (err) {
      console.error("Error al eliminar equipo:", err);
    } finally {
      setModalLoading(false);
      setModalOpen(false);
      setSelectedEquipo(null);
    }
  };

  // ✏️ Editar equipo
  const handleEditClick = (equipo_id) => {
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
    <LayoutSubView title={"Equipos"}>

      {equipos.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No hay equipos registrados.
        </Typography>
      ) : (
        <Box className="space-y-4">
          {equipos.map((equipo) => (
            <CategoriaCard
              key={equipo.equipo_id}
              nombre={equipo.nombre}
              onEdit={() => handleEditClick(equipo.equipo_id)}
              onDelete={() => handleDeleteClick(equipo)}
            />
          ))}
        </Box>
      )}

      {/* 🔥 Modal de confirmación */}
      <ConfirmacionModal
        isOpen={modalOpen}
        title="Confirmar Borrado"
        message={
          selectedEquipo
            ? `¿Seguro que deseas eliminar el equipo "${selectedEquipo.nombre}"?`
            : ""
        }
        onConfirm={handleConfirmDelete}
        onClose={() => setModalOpen(false)}
        isLoading={modalLoading}
      />
  </LayoutSubView>
  );
}
