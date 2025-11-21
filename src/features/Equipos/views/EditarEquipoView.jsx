// src/features/Dashboard/pages/Categorias/EditarCategoria.jsx
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useRoute } from "wouter";
import equiposService from "../../../../services/equipos/EquiposService";
import useForm from "../../../../hooks/useForm";
import CategoriaForm from "../../Categorias/components/CategoriaForm";

export default function EditarCategoria() {
  const [match, params] = useRoute(
    "/dashboard/mas/equipos/editar-equipo/:equipo_id"
  );
  const equipoId = params?.equipo_id;

  const { values, errors, handleChange, setValues, validateForm, resetForm } = useForm(
    { nombre: "" },
    (values) => {
      const errors = {};
      if (!values.nombre?.trim()) {
        errors.nombre = "El nombre es requerido";
      }
      return errors; // <-- 🔥 IMPORTANTE
    }
  );

  // Cargar datos de la categoría
  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const equipo = await equiposService.obtenerEquipoPorId(equipoId);
        if (equipo) {
          setValues({
            nombre: equipo.nombre ?? "" // <-- Nunca undefined
          });
        }
      } catch (error) {
        console.error("Error al cargar la categoría:", error);
      }
    };
    if (equipoId) fetchEquipo();
  }, [equipoId, setValues]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await equiposService.actualizarEquipo(equipoId, values.nombre);
      alert("Equipo actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el equipo:", error);
      alert("Error al actualizar el equipo");
    }
  };

  return (
    <Box className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Editar Equipo
      </h1>

<CategoriaForm
  values={values}
  errors={errors}
  handleChange={handleChange}   // ✔ nombre correcto del prop
  onSubmit={handleSubmit}
  onCancel={resetForm}
/>
    </Box>
  );
}
