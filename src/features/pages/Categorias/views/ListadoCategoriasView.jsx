// src/features/Dashboard/pages/Categorias/ListadoCategorias.jsx
import { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import CategoriaCard from "../componets/CategoriaCard";
import ConfirmacionModal from "../../Personas/components/ConfirmacionModal";
import categoriasService from "../../../../services/categorias/CategoriasService"

export default function ListadoCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // ✅ Cargar categorías al montar
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await categoriasService.obtenerCategorias();
        setCategorias(data);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, [categorias]);

  // 🧩 Abrir modal de confirmación
  const handleDeleteClick = (categoria) => {
    setSelectedCategoria(categoria);
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
      await categoriasService.cambiarEstado(selectedCategoria.categoria_id, 1);
      setCategorias((prev) => prev.filter((c) => c.id !== selectedCategoria.categoria_id));
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
    } finally {
      setModalLoading(false);
      setModalOpen(false);
      setSelectedCategoria(null);
    }
  };

  // ✏️ Editar categoría (por ahora logueamos)
  const handleEditClick = (categoria_id) => {
       console.log(categoria_id)
        // Redirigir a la vista de edición, pasando el ID como prop
        setLocation(`/dashboard/mas/categorias/editar-categoria/${categoria_id}`); 
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
        Listado de Categorías
      </Typography>

      {categorias.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No hay categorías registradas.
        </Typography>
      ) : (
        <Box className="space-y-4">
          {categorias.map((categoria) => (
            <CategoriaCard
              key={categoria.categoria_id}
              nombre={categoria.nombre}
              onEdit={() => handleEditClick(categoria)}
              onDelete={() => handleDeleteClick(categoria)}
            />
          ))}
        </Box>
      )}

      {/* 🔥 Modal reutilizable */}
      <ConfirmacionModal
        isOpen={modalOpen}
        title="Confirmar Borrado"
        message={
          selectedCategoria
            ? `¿Seguro que deseas eliminar la categoría "${selectedCategoria.nombre}"?`
            : ""
        }
        onConfirm={handleConfirmDelete}
        onClose={() => setModalOpen(false)}
        isLoading={modalLoading}
      />
    </Box>
  );
}
