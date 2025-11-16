// src/features/Dashboard/pages/Categorias/EditarCategoria.jsx
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useRoute } from "wouter";
import categoriasService from "../../../../services/categorias/CategoriasService";
import useForm from "../../../../hooks/useForm";
import CategoriaForm from "../components/CategoriaForm";

export default function EditarCategoria() {
  const [match, params] = useRoute(
    "/dashboard/mas/categorias/editar-categoria/:categoria_id"
  );
  const categoriaId = params?.categoria_id;

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
    const fetchCategoria = async () => {
      try {
        const categoria = await categoriasService.obtenerCategoriaPorId(categoriaId);
        if (categoria) {
          setValues({
            nombre: categoria.nombre ?? "" // <-- Nunca undefined
          });
        }
      } catch (error) {
        console.error("Error al cargar la categoría:", error);
      }
    };
    if (categoriaId) fetchCategoria();
  }, [categoriaId, setValues]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await categoriasService.actualizarCategoria(categoriaId, values.nombre);
      alert("Categoría actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      alert("Error al actualizar la categoría");
    }
  };

  return (
    <Box className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Editar categoría
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
