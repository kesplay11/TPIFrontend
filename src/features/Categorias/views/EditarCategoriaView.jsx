// src/features/Dashboard/pages/Categorias/EditarCategoria.jsx
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useRoute } from "wouter";
import categoriasService from "../../../services/categorias/CategoriasService";
import useForm from "../../../hooks/useForm";
import CategoriaForm from "../components/CategoriaForm";
import LayoutSubView from "../../common/LayoutSubView";

export default function EditarCategoria() {
  const [match, params] = useRoute(
    "/dashboard/mas/categorias/editar-categoria/:categoria_id"
  );
  const categoriaId = params?.categoria_id;

  const { values, errors, handleChange, setValues, validateForm} = useForm(
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

  const handleCancel = () => {
    window.history.back();
  }

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
  <LayoutSubView title={"Editar Categoría"}>
    <CategoriaForm
      values={values}
      errors={errors}
      handleChange={handleChange}   // ✔ nombre correcto del prop
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  </LayoutSubView>
  );
}
